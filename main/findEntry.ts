import { asyncWait } from "./utils";
import { Collection } from "mongodb";

import { fetchMatch } from "./fetchers/fetchMatch";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import { getRandomMatchFromDB } from "./fetchers/fetchMatchAndTimeline";
import { findNewMatchFromMatch } from "./findNewMatchFromMatch";
import { ValueOf, ValueOfRegions } from ".";
import { MatchSummary, Match, QueueID } from "./types";
import { AxiosResponse } from "axios";
import { fetchFeaturedMatches } from "./fetchers/fetchFeaturedMatches";
import { fetchAccountInfo } from "./fetchers/fetchAccountInfo";

export async function findEntry(
  entryGameId: number | undefined,
  RIOT_API_REGION: ValueOfRegions,
  max_age = 48 * 60 * 60 * 1000,
  queues: QueueID[]
): Promise<MatchSummary> {
  let match: AxiosResponse<Match>;
  if (entryGameId) {
    // if entry game id: then get the match from that
    match = await fetchMatch(entryGameId, RIOT_API_REGION);
    let randomParticipantId =
      match.data.participantIdentities[
        Math.floor(Math.random() * match.data.participants.length)
      ].player.accountId
      
      return (await fetchMatchHistory(randomParticipantId, RIOT_API_REGION)  ).data.matches[0]
  } else {
    // if featured games:
    //    then get a list of featured games from api
    let featuredGames = await fetchFeaturedMatches(undefined, RIOT_API_REGION);
    let matchesSummary = featuredGames.data.gameList.filter((match) => {
      return match.gameQueueConfigID in queues
    });
    
    let randomGame = matchesSummary[Math.floor(Math.random() * (matchesSummary.length))]
    let randomParticipant = randomGame.participants[Math.floor(Math.random() * randomGame.participants.length)]
    let randomParticipantAccountInfo = await fetchAccountInfo(randomParticipant.summonerName, RIOT_API_REGION)
    return (await fetchMatchHistory(randomParticipantAccountInfo.accountId, RIOT_API_REGION)  ).data.matches[0]
  }
}
