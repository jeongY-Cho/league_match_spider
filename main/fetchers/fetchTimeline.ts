import axios from "axios";
import { fetchWrapper } from "./fetchWrapper";
import { FramesResponse } from "../types";
import { endpoints } from "../constants";
import url from "url"
import { ValueOfRegions } from "..";

export function _fetchTimeline(match: number, RIOT_API_REGION: ValueOfRegions) {
  const MATCH_ENDPOINT = url.resolve(RIOT_API_REGION, endpoints.TIMELINE);
  return axios.get<FramesResponse>(MATCH_ENDPOINT + match,{
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY
    }
  });
}

export const fetchTimeline = fetchWrapper(_fetchTimeline);
