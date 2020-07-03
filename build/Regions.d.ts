export interface Regions {
    BR1: "https://br1.api.riotgames.com";
    EUN1: "https://eun1.api.riotgames.com";
    EUW1: "https://euw1.api.riotgames.com";
    JP1: "https://jp1.api.riotgames.com";
    KR: "https://kr.api.riotgames.com";
    LA1: "https://la1.api.riotgames.com";
    LA2: "https://la2.api.riotgames.com";
    NA1: "https://na1.api.riotgames.com";
    OC1: "https://oc1.api.riotgames.com";
    TR1: "https://tr1.api.riotgames.com";
    RU: "https://ru.api.riotgames.com";
    AMERICAS: "https://americas.api.riotgames.com";
    ASIA: "https://asia.api.riotgames.com";
    EUROPE: "https://europe.api.riotgames.com";
}
export declare const Regions: Regions;
export declare type RegionsURL = Regions[keyof Regions];
export declare type RegionsOption = RegionsURL | keyof Regions;
export declare function isRegionName(key: string): key is keyof Regions;
