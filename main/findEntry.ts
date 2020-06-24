import { fetchMatch } from "./fetchers/fetchMatch";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import { ValueOfRegions } from ".";
import { MatchSummary, QueueID } from "./types";
import { fetchFeaturedMatches } from "./fetchers/fetchFeaturedMatches";
import { fetchAccountInfo } from "./fetchers/fetchAccountInfo";

export async function findEntry(
  entryGameId: number | undefined,
  RIOT_API_REGION: ValueOfRegions,
  queues: QueueID[],
  max_age = 48 * 60 * 60 * 1000,
): Promise<MatchSummary> {
  let randomParticipantId: string;

  if (entryGameId) {
    // if entry game id: then get the match from that
    let match = await fetchMatch(entryGameId, RIOT_API_REGION);
    randomParticipantId =
      match.data.participantIdentities[
        Math.floor(Math.random() * match.data.participantIdentities.length)
      ].player.accountId;
  } else {
    // if featured games:
    //    then get a list of featured games from api
    let featuredGames = await fetchFeaturedMatches(undefined, RIOT_API_REGION);
    let matchesSummary = featuredGames.data.gameList

    let randomGame =
      matchesSummary[Math.floor(Math.random() * matchesSummary.length)];
    let randomParticipant =
      randomGame.participants[
        Math.floor(Math.random() * randomGame.participants.length)
      ];
    randomParticipantId = (
      await fetchAccountInfo(randomParticipant.summonerName, RIOT_API_REGION)
    ).data.accountId;
  }

  let matchHistory = (
    await fetchMatchHistory(randomParticipantId, RIOT_API_REGION)
  ).data.matches;
  return matchHistory.filter((match) => {
    return (match.timestamp >= Date.now() - max_age - 1000 && queues.includes(match.queue)) 
  })[0];
}
