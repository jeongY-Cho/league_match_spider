import { AxiosResponse } from "axios";
import { Collection } from "mongodb";
import { FramesResponse } from "../types/FullTimeline";
import { Match } from "../types/Match";
export declare const fetchMatchAndTimeline: (gameId: number, region: "https://br1.api.riotgames.com" | "https://eun1.api.riotgames.com" | "https://euw1.api.riotgames.com" | "https://jp1.api.riotgames.com" | "https://kr.api.riotgames.com" | "https://la1.api.riotgames.com" | "https://la2.api.riotgames.com" | "https://na1.api.riotgames.com" | "https://oc1.api.riotgames.com" | "https://tr1.api.riotgames.com" | "https://ru.api.riotgames.com") => Promise<[AxiosResponse<Match>, AxiosResponse<FramesResponse>]>;
export declare function getRandomMatchFromDB(Matches: Collection<Match>, max_age?: number): Promise<Match>;
