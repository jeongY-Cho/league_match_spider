import { fetchMatch } from "./fetchers/fetchMatch";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import { ValueOfRegions } from ".";
import { MatchSummary, QueueID } from "./types";
import { fetchFeaturedMatches } from "./fetchers/fetchFeaturedMatches";
import { fetchAccountInfo } from "./fetchers/fetchAccountInfo";
import log from "loglevel";

export async function findEntry(
  entryGameId: number | undefined,
  RIOT_API_REGION: ValueOfRegions,
  queues: QueueID[],
  max_age = 48 * 60 * 60 * 1000
): Promise<MatchSummary> {
  let summonerNames: string[] = [];

  if (entryGameId) {
    // if entry game id: then get participants  the match from that
    let match = await fetchMatch(entryGameId, RIOT_API_REGION);
    summonerNames = match.data.participantIdentities.map((participant) => {
      return participant.player.summonerName;
    });
  } else {
    // if featured games:
    //    then get a list of featured games from api
    let featuredGames = await fetchFeaturedMatches(undefined, RIOT_API_REGION);
    let matchesSummary = featuredGames.data.gameList;

    matchesSummary.forEach((match) => {
      return match.participants.forEach((participant) => {
        summonerNames.push(participant.summonerName);
      });
    });
  }

  for (let summonerName of summonerNames) {
    try {
      let accountId = (await fetchAccountInfo(summonerName, RIOT_API_REGION)).data
        .accountId;
      let history = await fetchMatchHistory(accountId, RIOT_API_REGION);
      for (let match of history.data.matches) {
        if (matchFilter(match)) {
          return match;
        }
      }
    } catch (err) {
      if ([403, 405, 415, 401].includes(err.response?.code)) {
        // only throw error if its one of these kinds of errors
        log.warn(err);
        throw err;
      }
    }
  }
  // if nothing found throw error
  throw "No match found with given params";

  function matchFilter(match: MatchSummary) {
    return (
      queues.includes(match.queue) &&
      match.timestamp >= Date.now() - max_age - 1000
    );
  }
}
