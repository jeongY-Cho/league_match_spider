import axios from "axios";
import { MatchHistoryResponse } from "../types";
import { fetchWrapper } from "./fetchWrapper";
import { endpoints } from "../constants";
import url from "url"
import { ValueOfRegions } from "..";

function _fetchMatchHistory(accountId: string, RIOT_API_REGION: ValueOfRegions) {
  const MATCH_HISTORY_ENDPOINT =
    url.resolve(RIOT_API_REGION,endpoints.MATCH_HISTORY);
  return axios.get<MatchHistoryResponse>(MATCH_HISTORY_ENDPOINT + accountId, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY
    }
  });
}

export const fetchMatchHistory = fetchWrapper(_fetchMatchHistory);
