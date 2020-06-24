
import { config } from "dotenv";
import { QueueID } from "./types";
import * as log from "loglevel";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import MatchBuffer from "./MatchBuffer";
import { fetchMatchAndTimeline } from "./fetchers/fetchMatchAndTimeline";
import { findEntry } from "./findEntry";
import { Regions, RegionLookup, URegions } from "./Regions";
config();

type MatchSpiderOptions = CommonOptions &
  (AccountFallback | FeaturedGameFallback);

interface CommonOptions {
  region: Regions | URegions;
  bufferSize?: number;
  queues?: QueueID[];
  entryGameId?: string;
  duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
  max_iter?: number;
  logging: log.LogLevelDesc
}

interface AccountFallback {
  fallbackMethod: "match";
  matchId: string;
}
interface FeaturedGameFallback {
  fallbackMethod?: "featured";
}

export type ValueOf<T> = T[keyof T];
export type ValueOfRegions = ValueOf<RegionLookup>;

export function MatchSpider(options: MatchSpiderOptions) {
  // load from dot env for access in functions
  config();
  if (process.env.RIOT_API_KEY) {
    // log successfully found
    log.info("Using API key:", process.env.RIOT_API_KEY);
  } else {
    // 
    log.warn("RIOT_API_KEY not found in .env; terminating");
    throw "RIOT_API_KEY not found in .env; add RIOT_API_KEY to .env and try again";
  }

  const defaults = {
    fallbackMethod: "featured_game",
    bufferSize: 1000,
    queues: [QueueID.Flex_SR, QueueID.Solo_SR],
    max_attempts: 3,
    max_age: 24 * 60 * 60 * 1000,
    entryGameId: undefined,
    duplicateChecker: async function(){return false},
    logging: log.levels.WARN
  };

  let _options = Object.assign(defaults, options);

  log.setLevel(log.levels.WARN)
  if (_options.logging) {
    log.setLevel(_options.logging)
  }

  return {
    iter: async function* (max_iter?:number) {
      // initialize buffer
      const matchBuffer = new MatchBuffer(_options.bufferSize);
      log.debug(
        `matchBuffer initialized with max size: ${_options.bufferSize}`
      );

      if (_options.entryGameId) {
        log.info("Starting crawl with entryGame:", _options.entryGameId);
      } else {
        log.info("Starting crawl with featured game entry");
      }
      let loops = 0
      while (loops < (max_iter || Infinity)) {
        log.info(`match buffer current length: ${matchBuffer.length}`);
        // get the (entry) game
        let targetMatch =
          matchBuffer.shift() ||
          (await findEntry(
            _options.entryGameId,
            RegionLookup[_options.region],
            _options.max_age,
            _options.queues
          ));
        log.debug("got game:", targetMatch.gameId);

        // check if match is a duplicate or not
        if (await _options.duplicateChecker(targetMatch.gameId)) {
          // if is duplicate skip
          log.debug(`${targetMatch.gameId} is a duplicate; skipping...`);
          continue;
        }

        // get the game info
        let [matchRes, timelineRes] = await fetchMatchAndTimeline(
          targetMatch.gameId,
          RegionLookup[_options.region]
        );
        log.debug("fetched match and timeline data for", targetMatch.gameId);

        // get a random player to pull match history from
        let randomAccount =
          matchRes.data.participantIdentities[Math.floor(Math.random() * 10)]
            .player.accountId;

        if (matchBuffer.length < _options.bufferSize - 20) {
          log.info(
            `refilling matchBuffer; current length: ${matchBuffer.length}`
          );
          let matchHistory = await fetchMatchHistory(
            randomAccount,
            RegionLookup[_options.region]
          );
          matchHistory.data.matches.forEach((match) => {
            if (match.queue in _options.queues) {
              matchBuffer.push(match);
            }
          });
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


