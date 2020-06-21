import { AxiosResponse } from "axios";
import { Collection } from "mongodb";
import { FramesResponse } from "../types/FullTimeline";
import { Match } from "../types/Match";
export declare const fetchMatchAndTimeline: (gameId: number, region: string) => Promise<[AxiosResponse<Match>, AxiosResponse<FramesResponse>]>;
export declare function getRandomMatchFromDB(Matches: Collection<Match>, max_age?: number): Promise<Match>;
