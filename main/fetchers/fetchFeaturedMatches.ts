import axios, { AxiosResponse } from "axios";
import { fetchWrapper } from "./fetchWrapper";
import { ValueOfRegions } from "..";
import url from "url";
import {FeaturedMatchesResponse}  from "../types";
import { endpoints } from "../constants";

function _fetchFeaturedMatches(
  u: undefined,
  region: ValueOfRegions
): Promise<AxiosResponse<FeaturedMatchesResponse.FeaturedMatchResponse>> {
  let featuredGamesEndpoint = url.resolve(region, endpoints.FEATURED_MATCHES);
  return axios.get(featuredGamesEndpoint, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY!,
    },
  });
}

export const fetchFeaturedMatches = fetchWrapper(_fetchFeaturedMatches);
