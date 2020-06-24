export declare enum Regions {
    "BR1" = "BR1",
    "EUN1" = "EUN1",
    "EUW1" = "EUW1",
    "JP1" = "JP1",
    "KR" = "KR",
    "LA1" = "LA1",
    "LA2" = "LA2",
    "NA1" = "NA1",
    "OC1" = "OC1",
    "TR1" = "TR1",
    "RU" = "RU",
    "AMERICAS" = "AMERICAS",
    "ASIA" = "ASIA",
    "EUROPE" = "EUROPE"
}
export declare type URegions = "BR1" | "EUN1" | "EUW1" | "JP1" | "KR" | "LA1" | "LA2" | "NA1" | "OC1" | "TR1" | "RU" | "AMERICAS" | "ASIA" | "EUROPE";
export declare type RegionLookup = {
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
    [Regions.AMERICAS]: "https://americas.api.riotgames.com";
    [Regions.ASIA]: "https://asia.api.riotgames.com";
    [Regions.EUROPE]: "https://europe.api.riotgames.com";
};
export declare const RegionLookup: RegionLookup;
