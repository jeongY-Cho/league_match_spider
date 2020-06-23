import axios from "axios";
import { fetchWrapper } from "./fetchWrapper";

export function _fetchTimeline(match: number, RIOT_API_REGION: string) {
  const MATCH_ENDPOINT = RIOT_API_REGION + "lol/match/v4/timelines/by-match/";
  return axios.get<FramesResponse>(MATCH_ENDPOINT + match);
}

export const fetchTimeline = fetchWrapper(_fetchTimeline);
