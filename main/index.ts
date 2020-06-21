import axios from "axios";
import { config } from "dotenv";
import { MongoClient as Mongo } from "mongodb";
import { Frames } from "./types/FullTimeline";
import { Match, QueueID, Timeline } from "./types/Match";
import { median } from "mathjs";
import * as log from "loglevel";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import { MatchBuffer } from "./MatchBuffer";
import { fetchMatchAndTimeline } from "./fetchers/fetchMatchAndTimeline";
import { existsInCollection } from "./utils";
import { findEntry } from "./findEntry";
config();
log.setLevel(log.levels.DEBUG);

let { RIOT_API_NA, RIOT_API_KEY, FALLBACK_ENTRY } = process.env;

if (
  RIOT_API_NA === undefined ||
  RIOT_API_KEY === undefined ||
  FALLBACK_ENTRY === undefined
) {
  throw "no key or url or entry";
}
axios.defaults.headers.common["X-Riot-Token"] = RIOT_API_KEY;

const MONGO_URI = "mongodb://localhost:20000";

const leagueDB = "league";
const matchesColl = "matches";
const timelineColl = "timelines";
const analysisColl = "analysis";

export async function matchSpider(RIOT_API_REGION: string) {
  const FEATURED_GAMES_URL = "";

  // init MatchBuffer
  const matchBuffer = new MatchBuffer(1000);
  let client: Mongo;
  try {
    // connect to Mongo.
    log.debug(`Connecting to mongoDb at ${MONGO_URI}`);
    client = await Mongo.connect(MONGO_URI, { useUnifiedTopology: true });
    log.info(`Connected to mongoDb at ${MONGO_URI}`);
    // connect to db
    let League = client.db(leagueDB);
    // connect to collection
    let Matches = League.collection<Match>(matchesColl);
    let Timelines = League.collection<Frames>(timelineColl);
    log.info("Connected to collections: matches, timelines, analysis");

    log.info("Beginning Crawl");
    while (true) {
      // shift most recent game in buffer and get match data
      // if none then find new entry
      let targetMatch = matchBuffer.shift();
      let targetGameId =
        targetMatch?.gameId ||
        (await findEntry(Matches, RIOT_API_REGION, FEATURED_GAMES_URL));
      log.debug("matchFrom Buffer:", targetMatch?.gameId, targetMatch?.queue);
      if (
        targetMatch &&
        targetMatch?.queue !== QueueID.Solo_SR &&
        targetMatch?.queue !== QueueID.Flex_SR
      ) {
        // if match isn't ranked: skip
        log.debug(`targetMatch: ${targetMatch.gameId} is not Ranked; skipping`);
        continue;
      } else if (await existsInCollection(Matches)({ gameId: targetGameId })) {
        // if match is already in db: skip
        log.debug(`${targetGameId} is already in Db; skipping`);
        continue;
      }

      // fetch match and timeline
      let [matchRes, timelineRes] = await fetchMatchAndTimeline(
        targetGameId,
        RIOT_API_REGION
      );

      // if match is less than 15 minutes: continue to next match;
      if (matchRes.data.gameDuration < 900) {
        log.debug(
          `match ${targetGameId} is too short; game duration: ${matchRes.data.gameDuration}`
        );
        continue;
      }

      // add gameId to timeline
      let timeline: Frames = Object.assign({}, timelineRes.data, {
        gameId: matchRes.data.gameId,
      });

      // TODO attach role analysis results to match

      try {
        // insert into database
        await Promise.all([
          Timelines.insertOne(timeline),
          Matches.insertOne(matchRes.data),
        ]);
        log.info(`New Entry: `, matchRes.data.gameId);
      } catch (err) {
        // catch and log any errors. usually duplicate key error
        // TODO: error handling for insertions
        log.warn("Error writing to DB", err);
        // but just log it and go to next
      }

      // pick a random account from list of participants in target match
      if (matchBuffer.length < matchBuffer.max_size - 10) {
        let randomAccount =
          matchRes.data.participantIdentities[Math.floor(Math.random() * 10)]
            .player.accountId;
        try {
          // get match history of randomAccount
          let matchHistory = await fetchMatchHistory(
            randomAccount,
            RIOT_API_REGION
          );
          // push match history to buffer
          matchBuffer.push(
            ...matchHistory.data.matches.filter((summary) => {
              return (
                summary.queue === QueueID.Solo_SR ||
                summary.queue === QueueID.Flex_SR
              );
            })
          );
          log.debug(`matchBuffer length is now: ${matchBuffer.length}`);
        } catch (err) {
          // if theres an error fetching just skip and go next
          log.info("Error fetching matchHistory for buffer going next", err);
        }
      }
    }
  } catch (err) {
    // if error connecting to db log error then exit
    log.error("Fatal Error. Ending Processes");
    log.trace(err);
  }

  // @ts-ignore
  if (client !== undefined) {
    client.close();
  }
}

interface MatchSpiderOptions {}

export function MatchSpider(options: MatchSpiderOptions) {}
