import { MatchHistoryResponse } from "../types/MatchHistory";
export declare const fetchMatchHistory: (gameId: string, region: string) => Promise<import("axios").AxiosResponse<MatchHistoryResponse>>;
