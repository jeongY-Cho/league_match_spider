import { QueueID } from "./types";
import * as log from "loglevel";
import { Regions, RegionLookup, URegions } from "./Regions";
<<<<<<< HEAD
declare type MatchSpiderOptions = CommonOptions & (MatchEntry | FeaturedEntry);
=======
declare type MatchSpiderOptions = CommonOptions & (MatchFallback | FeaturedGameFallback);
>>>>>>> 327c5a38197faaa8436381be4e5867cfcf9e70c8
interface CommonOptions {
    region: Regions | URegions;
    bufferSize?: number;
    queues?: QueueID[];
    duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
    max_iter?: number;
    logging?: log.LogLevelDesc;
}
<<<<<<< HEAD
interface MatchEntry {
    entryMethod: "match";
=======
interface MatchFallback {
    fallbackMethod: "match";
>>>>>>> 327c5a38197faaa8436381be4e5867cfcf9e70c8
    entryGameId: number;
}
interface FeaturedEntry {
    entryMethod: "featured";
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
