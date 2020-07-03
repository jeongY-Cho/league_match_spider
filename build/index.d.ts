import { QueueID } from "./types";
import * as log from "loglevel";
import { Regions, RegionsOption } from "./Regions";
declare type MatchSpiderOptions = CommonOptions & (MatchEntry | FeaturedEntry);
interface CommonOptions {
    region: RegionsOption;
    bufferSize?: number;
    queues?: QueueID[];
    duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
    max_iter?: number;
    logging?: log.LogLevelDesc;
}
interface MatchEntry {
    entryMethod: "match";
    entryGameId: number;
}
interface FeaturedEntry {
    entryMethod: "featured";
}
export declare type ValueOf<T> = T[keyof T];
export declare type ValueOfRegions = ValueOf<Regions>;
export declare function MatchSpider(options: MatchSpiderOptions): {
    iter: (max_iter?: number | undefined) => AsyncGenerator<{
        match: import("./types").Match;
        timeline: import("./types").FramesResponse;
    }, void, unknown>;
};
export {};
