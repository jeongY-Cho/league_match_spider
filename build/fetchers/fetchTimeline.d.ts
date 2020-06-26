import { FramesResponse } from "../types";
import { ValueOfRegions } from "..";
export declare function _fetchTimeline(match: number, RIOT_API_REGION: ValueOfRegions): Promise<import("axios").AxiosResponse<FramesResponse>>;
export declare const fetchTimeline: (id: number, region: "https://br1.api.riotgames.com" | "https://eun1.api.riotgames.com" | "https://euw1.api.riotgames.com" | "https://jp1.api.riotgames.com" | "https://kr.api.riotgames.com" | "https://la1.api.riotgames.com" | "https://la2.api.riotgames.com" | "https://na1.api.riotgames.com" | "https://oc1.api.riotgames.com" | "https://tr1.api.riotgames.com" | "https://ru.api.riotgames.com" | "https://americas.api.riotgames.com" | "https://asia.api.riotgames.com" | "https://europe.api.riotgames.com") => Promise<import("axios").AxiosResponse<FramesResponse>>;
