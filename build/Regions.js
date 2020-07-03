"use strict";
// export interface ERegions {
//   "BR1" : "BR1",
//   "EUN1" : "EUN1",
//   "EUW1" : "EUW1",
//   "JP1" : "JP1",
//   "KR" : "KR",
//   "LA1" : "LA1",
//   "LA2" : "LA2",
//   "NA1" : "NA1",
//   "OC1" : "OC1",
//   "TR1" : "TR1",
//   "RU" : "RU",
//   "AMERICAS" : "AMERICAS",
//   "ASIA" : "ASIA",
//   "EUROPE" : "EUROPE",
// }
// export type URegions =
//   | "BR1"
//   | "EUN1"
//   | "EUW1"
//   | "JP1"
//   | "KR"
//   | "LA1"
//   | "LA2"
//   | "NA1"
//   | "OC1"
//   | "TR1"
//   | "RU"
//   | "AMERICAS"
//   | "ASIA"
//   | "EUROPE";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegionName = exports.Regions = void 0;
exports.Regions = {
    BR1: "https://br1.api.riotgames.com",
    EUN1: "https://eun1.api.riotgames.com",
    EUW1: "https://euw1.api.riotgames.com",
    JP1: "https://jp1.api.riotgames.com",
    KR: "https://kr.api.riotgames.com",
    LA1: "https://la1.api.riotgames.com",
    LA2: "https://la2.api.riotgames.com",
    NA1: "https://na1.api.riotgames.com",
    OC1: "https://oc1.api.riotgames.com",
    TR1: "https://tr1.api.riotgames.com",
    RU: "https://ru.api.riotgames.com",
    AMERICAS: "https://americas.api.riotgames.com",
    ASIA: "https://asia.api.riotgames.com",
    EUROPE: "https://europe.api.riotgames.com",
};
function isRegionName(key) {
    return [
        "BR1",
        "EUN1",
        "EUW1",
        "JP1",
        "KR",
        "LA1",
        "LA2",
        "NA1",
        "OC1",
        "TR1",
        "RU",
        "AMERICAS",
        "ASIA",
        "EUROPE",
    ].includes(key);
}
exports.isRegionName = isRegionName;
//# sourceMappingURL=Regions.js.map