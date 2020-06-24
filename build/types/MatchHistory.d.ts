import { PlatformID, QueueID } from "./Match";
export interface MatchHistoryResponse {
    matches: MatchSummary[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}
export interface MatchSummary {
    platformId: PlatformID;
    gameId: number;
    champion: number;
    queue: QueueID;
    season: number;
    timestamp: number;
    role: Role;
    lane: Lane;
}
export declare enum Lane {
    Bottom = "BOTTOM",
    Jungle = "JUNGLE",
    Mid = "MID",
    None = "NONE",
    Top = "TOP"
}
export declare enum Role {
    Duo = "DUO",
    DuoCarry = "DUO_CARRY",
    DuoSupport = "DUO_SUPPORT",
    None = "NONE",
    Solo = "SOLO"
}
