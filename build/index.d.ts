import { QueueID } from "./types";
import * as log from "loglevel";
import { Regions, RegionLookup, URegions } from "./Regions";
declare type MatchSpiderOptions = CommonOptions & (AccountFallback | FeaturedGameFallback);
interface CommonOptions {
    region: Regions | URegions;
    bufferSize?: number;
    queues?: QueueID[];
    entryGameId?: number;
    duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
    max_iter?: number;
    logging?: log.LogLevelDesc;
}
interface AccountFallback {
    fallbackMethod: "match";
    matchId: string;
}
interface FeaturedGameFallback {
    fallbackMethod?: "featured";
}
export declare type ValueOf<T> = T[keyof T];
export declare type ValueOfRegions = ValueOf<RegionLookup>;
export declare function MatchSpider(options: MatchSpiderOptions): {
    iter: (max_iter?: number | undefined) => AsyncGenerator<{
        match: import("./types").Match;
        timeline: import("./types").FramesResponse;
    }, void, unknown>;
};
export {};
