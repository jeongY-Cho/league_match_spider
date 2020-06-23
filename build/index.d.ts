import { QueueID } from "./types/Match";
export declare function matchSpider(RIOT_API_REGION: string): Promise<void>;
declare type MatchSpiderOptions = CommonOptions & (AccountFallback | FeaturedGameFallback);
interface CommonOptions {
    region: Regions;
    mongoURI: string;
    dbName: string;
    collectionName: string;
    bufferSize?: number;
    queues?: QueueID[];
    entryGameId?: string;
    duplicateChecker?: (gameId: number) => boolean | boolean;
}
interface AccountFallback {
    fallbackMethod: "match";
    matchId: string;
}
interface FeaturedGameFallback {
    fallbackMethod?: "featured";
}
declare enum Regions {
    "BR1" = 0,
    "EUN1" = 1,
    "EUW1" = 2,
    "JP1" = 3,
    "KR" = 4,
    "LA1" = 5,
    "LA2" = 6,
    "NA1" = 7,
    "OC1" = 8,
    "TR1" = 9,
    "RU" = 10
}
declare type RegionLookup = {
    [Regions.BR1]: "https://br1.api.riotgames.com";
    [Regions.EUN1]: "https://eun1.api.riotgames.com";
    [Regions.EUW1]: "https://euw1.api.riotgames.com";
    [Regions.JP1]: "https://jp1.api.riotgames.com";
    [Regions.KR]: "https://kr.api.riotgames.com";
    [Regions.LA1]: "https://la1.api.riotgames.com";
    [Regions.LA2]: "https://la2.api.riotgames.com";
    [Regions.NA1]: "https://na1.api.riotgames.com";
    [Regions.OC1]: "https://oc1.api.riotgames.com";
    [Regions.TR1]: "https://tr1.api.riotgames.com";
    [Regions.RU]: "https://ru.api.riotgames.com";
};
declare const RegionLookup: RegionLookup;
export declare type ValueOf<T> = T[keyof T];
export declare type ValueOfRegions = ValueOf<RegionLookup>;
export declare function MatchSpider(options: MatchSpiderOptions): {
    iter: () => AsyncGenerator<number, never, unknown>;
};
export {};
