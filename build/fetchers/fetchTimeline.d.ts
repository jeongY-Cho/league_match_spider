import { FramesResponse } from "../types/FullTimeline";
export declare function _fetchTimeline(match: number, RIOT_API_REGION: string): Promise<import("axios").AxiosResponse<FramesResponse>>;
export declare const fetchTimeline: (gameId: number, region: string) => Promise<import("axios").AxiosResponse<FramesResponse>>;
