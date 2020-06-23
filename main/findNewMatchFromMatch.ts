import { AxiosResponse } from "axios";
import { Collection } from "mongodb";
import { Match, QueueID } from "./types/Match";
import { MatchHistoryResponse } from "./types";
import * as log from "loglevel";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import { asyncWait } from "./findEntry";
import { existsInCollection } from "./utils/";

export async function findNewMatchFromMatch(
  aMatch: Match,
  max_age = 24 * 60 * 60 * 1000,
  Matches: Collection<Match>,
  RIOT_API_REGION: string
) {
  for (let participant of aMatch.participantIdentities) {
    // iterate though participant list and get match history
    let matchHistory: AxiosResponse<MatchHistoryResponse>;
    try {
      matchHistory = await fetchMatchHistory(
        participant.player.accountId,
        RIOT_API_REGION
      );
    } catch (err) {
      switch (err.response?.status) {
        case 429:
          await asyncWait(parseInt(err.response.headers["retry-after"]));
          matchHistory = await fetchMatchHistory(
            participant.player.accountId,
            RIOT_API_REGION
          );
          break;
        case 400:
        case 403:
        case 404:
        case 405:
        case 415:
          continue;
        case 504:
        case 401:
        case 500:
        case 502:
        case 503:
        default:
          if (err.code === "ETIMEDOUT") {
            matchHistory = await fetchMatchHistory(
              participant.player.accountId,
              RIOT_API_REGION
            );
          } else {
            console.log("line 354");
            throw err;
          }
      }
    }

    for (let foundMatch of matchHistory.data.matches) {
      if (foundMatch.timestamp < Date.now() - max_age) {
        // if a game is older than max age break out of loop.
        // return of api response is sorted by timestamp descending
        log.debug("game too old; skipping");
        break;
      }

      // search for found match in database
      if (
        await existsInCollection(Matches)({
          gameId: foundMatch.gameId,
        })
      ) {
        // if exists continue to next match
        log.debug("game exists in db; skipping");
        continue;
      } else {
        if (
          foundMatch.queue === QueueID.Solo_SR ||
          foundMatch.queue === QueueID.Flex_SR
        ) {
          // if the result is a ranked game return it, else continue
          log.debug(`found new match: ${foundMatch.gameId}`);
          return foundMatch.gameId;
        }
      }
    }
  }
}
