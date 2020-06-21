import axios from "axios";
import { Match } from "../types/Match";
import { fetchWrapper } from "../fetchWrapper";

function _fetchMatch(match: number, RIOT_API_REGION: string) {
  const MATCH_ENDPOINT = RIOT_API_REGION + "lol/match/v4/matches/";
  return axios.get<Match>(MATCH_ENDPOINT + match);
}
export const fetchMatch = fetchWrapper(_fetchMatch);
