import { QueueID } from "./types";

import { config } from "dotenv";
import * as log from "loglevel";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import MatchBuffer from "./MatchBuffer";
import { fetchMatchAndTimeline } from "./fetchers/fetchMatchAndTimeline";
import { findEntry } from "./findEntry";
import {Regions, RegionsOption, isRegionName, RegionsURL } from "./Regions";
config();

type MatchSpiderOptions = CommonOptions &
  (MatchEntry | FeaturedEntry);

interface CommonOptions {
  region: RegionsOption;
  bufferSize?: number;
  queues?: QueueID[];
  duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
  max_iter?: number;
  logging?: log.LogLevelDesc
}

interface MatchEntry {
  entryMethod: "match";
  entryGameId: number;
}
interface FeaturedEntry {
  entryMethod: "featured";
}

export type ValueOf<T> = T[keyof T];
export type ValueOfRegions = ValueOf<Regions>;

export function MatchSpider(options: MatchSpiderOptions) {
  // load from dot env for access in functions
  config();
  if (process.env.RIOT_API_KEY) {
    // log successfully found
    log.info("Using API key:", process.env.RIOT_API_KEY);
  } else {
    log.warn("RIOT_API_KEY not found in .env; terminating");
    throw "RIOT_API_KEY not found in .env; add RIOT_API_KEY to .env and try again";
  }

  // check that region supplied in options
  if (!options?.region) {
    log.warn("region not given")
    throw "Region not specified in options"
  } 

  const defaults = {
    entryMethod: "featured_game",
    bufferSize: 1000,
    queues: [QueueID.Flex_SR, QueueID.Solo_SR],
    max_attempts: 3,
    max_age: 24 * 60 * 60 * 1000,
    duplicateChecker: async function(){return false},
    logging: log.levels.WARN
  };

  let _options = Object.assign(defaults, options);

  log.setLevel(_options.logging)

  return {
    iter: async function* (max_iter?:number) {
      // initialize buffer
      const matchBuffer = new MatchBuffer(_options.bufferSize);
      log.debug(
        `matchBuffer initialized with max size: ${_options.bufferSize}`
      );

      // debug msg
      if (_options.entryMethod === "match") {
        if (_options.entryGameId) {
          log.info("Starting crawl with entryGame:", _options.entryGameId);
        } else {
          log.warn("entryMethod 'match' specified but no entry game given; using featured games instead")
        }
      } else {
        log.info("Starting crawl with featured game entry");
      }

      // get region url from region option
      let region: RegionsURL
      if (isRegionName(_options.region)) {
        region = Regions[_options.region]
      } else {
        region = _options.region
      }

      let loops = 0  // loop counter
      let skips = 0
      while (loops < (max_iter || Infinity)) {
        log.info(`match buffer current length: ${matchBuffer.length}`);
        // get the (entry) game
        let targetMatch =
          matchBuffer.shift() ||
          (await findEntry(
            // @ts-ignore  # can be undefined. 
            _options.entryGameId,
            region,
            _options.queues,
            _options.max_age,
          ));
        log.debug("got game:", targetMatch.gameId);

        // check if entry found:
        if (!targetMatch) {
          // if no entry found then loop back and try again
          continue
        }

        // check if match is a duplicate or not
        if (await _options.duplicateChecker(targetMatch.gameId)) {
          // if is duplicate skip
          log.debug(`${targetMatch.gameId} is a duplicate; skipping...`);
          skips ++
          if (skips === 1000) {
            log.warn(`skipped ${skips} in a row `)
          }
          continue;
        } else {
          skips = 0
        }

        

        // get the game info
        let [matchRes, timelineRes] = await fetchMatchAndTimeline(
          targetMatch.gameId,
          region
        );
        log.debug("fetched match and timeline data for", targetMatch.gameId);

        
        if (matchBuffer.length < _options.bufferSize - 20) {
          // if the buffer has a small number of entries: fill it
          // implemented to limit the number of api calls

          // get a random player to pull match history from
          let randomAccount =
            matchRes.data.participantIdentities[Math.floor(Math.random() * matchRes.data.participantIdentities.length)]
              .player.accountId;
          log.info(
            `refilling matchBuffer; current length: ${matchBuffer.length}`
          );
          try {
            let matchHistory = await fetchMatchHistory(
              randomAccount,
              region
            );
            matchHistory.data.matches.slice(0,10).forEach((match) => {
              if (_options.queues.includes(match.queue)) {
                matchBuffer.push(match);
              }
            });

          } catch (err) {
            // just skip this err; an error would be raised elsewhere if its a breaking error
            log.warn("Err while getting match history", err)

          }
        }

        // yield result
        yield {
          match: matchRes.data,
          timeline: timelineRes.data,
        };
        loops++
      }
      return
    },
  };
}
