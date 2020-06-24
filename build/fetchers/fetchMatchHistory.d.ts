import { MatchHistoryResponse } from "../types";
export declare const fetchMatchHistory: (id: string, region: string) => Promise<import("axios").AxiosResponse<MatchHistoryResponse>>;
