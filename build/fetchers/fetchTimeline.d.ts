import { FramesResponse } from "../types";
export declare function _fetchTimeline(match: number, RIOT_API_REGION: string): Promise<import("axios").AxiosResponse<FramesResponse>>;
export declare const fetchTimeline: (id: number, region: string) => Promise<import("axios").AxiosResponse<FramesResponse>>;
