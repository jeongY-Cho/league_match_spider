import { ValueOfRegions } from ".";
import { MatchSummary } from "./types/MatchHistory";
export declare function findEntry(entryGameId: number | undefined, RIOT_API_REGION: ValueOfRegions, featured_games_url: string, max_age?: number): Promise<MatchSummary>;
