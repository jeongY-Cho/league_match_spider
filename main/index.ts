
import { config } from "dotenv";
import { QueueID } from "./types";
import * as log from "loglevel";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import MatchBuffer from "./MatchBuffer";
import { fetchMatchAndTimeline } from "./fetchers/fetchMatchAndTimeline";
import { findEntry } from "./findEntry";
config();
log.setLevel(log.levels.DEBUG);

type MatchSpiderOptions = CommonOptions &
  (AccountFallback | FeaturedGameFallback);

interface CommonOptions {
  region: Regions;
  mongoURI: string;
  dbName: string;
  collectionName: string;
  bufferSize?: number;
  queues?: QueueID[];
  entryGameId?: string;
  duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
  max_iter?: number;
}

interface AccountFallback {
  fallbackMethod: "match";
  matchId: string;
}
interface FeaturedGameFallback {
  fallbackMethod?: "featured";
}

enum Regions {
  "BR1",
  "EUN1",
  "EUW1",
  "JP1",
  "KR",
  "LA1",
  "LA2",
  "NA1",
  "OC1",
  "TR1",
  "RU",
}

type RegionLookup = {
  [Regions.BR1]: "https://br1.api.riotgames.com";
  [Regions.EUN1]: "https://eun1.api.riotgames.com";
  [Regions.EUW1]: "https://euw1.api.riotgames.com";
  [Regions.JP1]: "https://jp1.api.riotgames.com";
  [Regions.KR]: "https://kr.api.riotgames.com";
  [Regions.LA1]: "https://la1.api.riotgames.com";
  [Regions.LA2]: "https://la2.api.riotgames.com";
  [Regions.NA1]: "https://na1.api.riotgames.com";
  [Regions.OC1]: "https://oc1.api.riotgames.com";
  [Regions.TR1]: "https://tr1.api.riotgames.com";
  [Regions.RU]: "https://ru.api.riotgames.com";
};
const RegionLookup: RegionLookup = {
  [Regions.BR1]: "https://br1.api.riotgames.com",
  [Regions.EUN1]: "https://eun1.api.riotgames.com",
  [Regions.EUW1]: "https://euw1.api.riotgames.com",
  [Regions.JP1]: "https://jp1.api.riotgames.com",
  [Regions.KR]: "https://kr.api.riotgames.com",
  [Regions.LA1]: "https://la1.api.riotgames.com",
  [Regions.LA2]: "https://la2.api.riotgames.com",
  [Regions.NA1]: "https://na1.api.riotgames.com",
  [Regions.OC1]: "https://oc1.api.riotgames.com",
  [Regions.TR1]: "https://tr1.api.riotgames.com",
  [Regions.RU]: "https://ru.api.riotgames.com",
};

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
  };

  let _options = Object.assign(defaults, options);
  return {
    iter: async function* () {
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

      while (true) {
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
      }
    },
  };
}


