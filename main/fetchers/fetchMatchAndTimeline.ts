import { AxiosResponse } from "axios";
import { Match, FramesResponse } from "../types";
import { fetchMatch } from "./fetchMatch";
import { fetchTimeline } from "./fetchTimeline";
import { fetchWrapper } from "./fetchWrapper";
import { ValueOfRegions } from "..";

async function _fetchMatchAndTimeline(
  gameId: number,
  RIOT_API_REGION: ValueOfRegions
): Promise<[AxiosResponse<Match>, AxiosResponse<FramesResponse>]> {
  return Promise.all([
    fetchMatch(gameId, RIOT_API_REGION),
    fetchTimeline(gameId, RIOT_API_REGION),
  ]);
}
export const fetchMatchAndTimeline = fetchWrapper(_fetchMatchAndTimeline);

