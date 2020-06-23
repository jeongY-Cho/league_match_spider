import axios, { AxiosResponse } from "axios";
import { fetchWrapper } from "../fetchWrapper";
import { ValueOfRegions } from "..";
import url from "url";
import { FeaturedMatchResponse } from "../types/FeaturedMatchesResponse";

function _fetchFeaturedMatches(
  u: undefined,
  region: ValueOfRegions
): Promise<AxiosResponse<FeaturedMatchResponse>> {
  let featuredGamesEndpoint = url.resolve(
    region,
    "lol/spectator/v4/featured-games"
  );
  return axios.get(featuredGamesEndpoint, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY!,
    },
  });
}

export const fetchFeaturedMatches = fetchWrapper(_fetchFeaturedMatches);
