import axios from "axios";
import { fetchWrapper } from "./fetchWrapper";

function _fetchMatchHistory(accountId: string, RIOT_API_REGION: string) {
  const MATCH_HISTORY_ENDPOINT =
    RIOT_API_REGION + "lol/match/v4/matchlists/by-account/";
  return axios.get<MatchHistoryResponse>(MATCH_HISTORY_ENDPOINT + accountId);
}

export const fetchMatchHistory = fetchWrapper(_fetchMatchHistory);
