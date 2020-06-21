import { Collection } from "mongodb";
import { Match } from "./types/Match";
export declare function findNewMatchFromMatch(aMatch: Match, max_age: number | undefined, Matches: Collection<Match>, RIOT_API_REGION: string): Promise<number | undefined>;
