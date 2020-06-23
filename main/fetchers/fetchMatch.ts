import axios from "axios";
import { Match } from "../types/Match";
import { fetchWrapper } from "../fetchWrapper";
import path from "path";
import url from "url";
import { ValueOfRegions } from "..";

function _fetchMatch(match: number, RIOT_API_REGION: ValueOfRegions) {
  const MATCH_ENDPOINT = url.resolve(RIOT_API_REGION, "lol/match/v4/matches/");
  return axios.get<Match>(MATCH_ENDPOINT + match);
}
export const fetchMatch = fetchWrapper(_fetchMatch);
