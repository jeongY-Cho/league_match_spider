import { Match } from "../types/Match";
export declare const fetchMatch: (gameId: number, region: string) => Promise<import("axios").AxiosResponse<Match>>;
