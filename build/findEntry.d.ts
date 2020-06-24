import { ValueOfRegions } from ".";
import { MatchSummary, QueueID } from "./types";
export declare function findEntry(entryGameId: number | undefined, RIOT_API_REGION: ValueOfRegions, queues: QueueID[], max_age?: number): Promise<MatchSummary>;
