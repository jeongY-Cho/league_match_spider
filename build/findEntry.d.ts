import { Collection } from "mongodb";
import { Match } from "./types/Match";
export declare function findEntry(Matches: Collection<Match>, RIOT_API_REGION: string, featured_games_url: string, max_age?: number): Promise<number>;
export declare function asyncWait(secs: number): Promise<unknown>;
