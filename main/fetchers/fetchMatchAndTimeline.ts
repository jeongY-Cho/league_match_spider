import { AxiosResponse } from "axios";
import { Collection } from "mongodb";
import { FramesResponse } from "../types/FullTimeline";
import { Match } from "../types/Match";
import { fetchMatch } from "./fetchMatch";
import { fetchTimeline } from "./fetchTimeline";
import { fetchWrapper } from "../fetchWrapper";

async function _fetchMatchAndTimeline(
  gameId: number,
  RIOT_API_REGION: string
): Promise<[AxiosResponse<Match>, AxiosResponse<FramesResponse>]> {
  return Promise.all([
    fetchMatch(gameId, RIOT_API_REGION),
    fetchTimeline(gameId, RIOT_API_REGION),
  ]);
}
export const fetchMatchAndTimeline = fetchWrapper(_fetchMatchAndTimeline);
export async function getRandomMatchFromDB(
  Matches: Collection<Match>,
  max_age = 24 * 60 * 60 * 1000
) {
  let ret = Matches.aggregate([
    { $match: { gameCreation: { $gt: Date.now() - max_age } } },
    { $sample: { size: 1 } },
  ]);
  return (await ret.next()) as Match;
}
