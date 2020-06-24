import axios from "axios";
import { fetchWrapper } from "./fetchWrapper";
import { FramesResponse } from "../types";
import { endpoints } from "../constants";

export function _fetchTimeline(match: number, RIOT_API_REGION: string) {
  const MATCH_ENDPOINT = RIOT_API_REGION + endpoints.TIMELINE;
  return axios.get<FramesResponse>(MATCH_ENDPOINT + match);
}

export const fetchTimeline = fetchWrapper(_fetchTimeline);
