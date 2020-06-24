import axios from "axios";
import { Match } from "../types";
import { fetchWrapper } from "./fetchWrapper";
import path from "path";
import url from "url";
import { ValueOfRegions } from "..";
import { endpoints } from "../constants";

function _fetchMatch(match: number, RIOT_API_REGION: ValueOfRegions) {
  const MATCH_ENDPOINT = url.resolve(RIOT_API_REGION, endpoints.MATCHES);
  return axios.get<Match>(MATCH_ENDPOINT + match, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY
    }
  });
}
export const fetchMatch = fetchWrapper(_fetchMatch);
