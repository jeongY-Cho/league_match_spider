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

export async function findEntry(
  entryGameId: number | undefined,
  RIOT_API_REGION: ValueOfRegions,
  featured_games_url: string,
  max_age = 48 * 60 * 60 * 1000
): Promise<MatchSummary> {
  let match: AxiosResponse<Match>;
  if (entryGameId) {
    // if entry game id: then get the match from that
    match = await fetchMatch(entryGameId, RIOT_API_REGION);
  } else {
    // if featured games:
    //    then get a list of featured ranked games from api
    let featuredGames = await fetchFeaturedMatches(undefined, RIOT_API_REGION);
    let matchesSummary = featuredGames.data.gameList.filter((match) => {
      return match.gameQueueConfigID;
    });
  }
}
