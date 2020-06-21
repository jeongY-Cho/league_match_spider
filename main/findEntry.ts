import { Collection } from "mongodb";
import { Match } from "./types/Match";
import { fetchMatch } from "./fetchers/fetchMatch";
import { fetchMatchHistory } from "./fetchers/fetchMatchHistory";
import { getRandomMatchFromDB } from "./fetchers/fetchMatchAndTimeline";
import { findNewMatchFromMatch } from "./findNewMatchFromMatch";
export async function findEntry(
  Matches: Collection<Match>,
  RIOT_API_REGION: string,
  featured_games_url: string,
  max_age = 48 * 60 * 60 * 1000
) {
  // iterate through most recent 100 games till an entry point is found.
  // entry point is a new match not in db
  for (let i = 0; i < 100; i++) {
    // find a match from database ordered by game creation
    let aMatch = await getRandomMatchFromDB(Matches);

    if (aMatch) {
      // if a match is found in db find a new match from match
      let ret = await findNewMatchFromMatch(
        aMatch,
        max_age,
        Matches,
        RIOT_API_REGION
      );
      if (ret) {
        return ret;
      }
    } else {
      // if no entries are found then break out of loop
      break;
    }
  }
  // if no matches are in db or no new matches are found use FALLBACK_ENTRY as entry account
  // TODO: use random game from riot featured matches
  // let matchHistory = await fetchMatchHistory(fallback, RIOT_API_REGION);
  // // iterate through fallback account matches till one is found
  // for (let match of matchHistory.data.matches) {
  //   let aMatch = await fetchMatch(match.gameId, RIOT_API_REGION);
  //   let entry = await findNewMatchFromMatch(
  //     aMatch.data,
  //     10000000000,
  //     Matches,
  //     RIOT_API_REGION
  //   );
  //   if (entry) {
  //     return entry;
  //   }
  // }
  // if nothing is found throw fatal error
  throw "No entry found";
}

export function asyncWait(secs: number) {
  console.log(`Waiting ${secs}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, secs * 1000);
  });
}
