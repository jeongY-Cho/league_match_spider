export interface Frames {
    gameId: number;
    frames: Frame[];
    frameInterval: number;
}
export interface FramesResponse {
    frames: Frame[];
    frameInterval: number;
}
export interface Frame {
    participantFrames: {
        [key: string]: ParticipantFrame;
    };
    events: Event[];
    timestamp: number;
}
export interface Event {
    type: Type;
    timestamp: number;
    participantId?: number;
    itemId?: number;
    skillSlot?: number;
    levelUpType?: LevelUpType;
    wardType?: WardType;
    creatorId?: number;
    position?: Position;
    killerId?: number;
    victimId?: number;
    assistingParticipantIds?: number[];
    afterId?: number;
    beforeId?: number;
    monsterType?: string;
    monsterSubType?: string;
    teamId?: number;
    buildingType?: BuildingType;
    laneType?: LaneType;
    towerType?: string;
}
export declare enum BuildingType {
    InhibitorBuilding = "INHIBITOR_BUILDING",
    TowerBuilding = "TOWER_BUILDING"
}
export declare enum LaneType {
    BotLane = "BOT_LANE",
    MidLane = "MID_LANE",
    TopLane = "TOP_LANE"
}
export declare enum LevelUpType {
    Normal = "NORMAL"
}
export interface Position {
    x: number;
    y: number;
}
export declare enum Type {
    BuildingKill = "BUILDING_KILL",
    ChampionKill = "CHAMPION_KILL",
    EliteMonsterKill = "ELITE_MONSTER_KILL",
    ItemDestroyed = "ITEM_DESTROYED",
    ItemPurchased = "ITEM_PURCHASED",
    ItemSold = "ITEM_SOLD",
    ItemUndo = "ITEM_UNDO",
    SkillLevelUp = "SKILL_LEVEL_UP",
    WardKill = "WARD_KILL",
    WardPlaced = "WARD_PLACED"
}
export declare enum WardType {
    ControlWard = "CONTROL_WARD",
    SightWard = "SIGHT_WARD",
    Undefined = "UNDEFINED",
    YellowTrinket = "YELLOW_TRINKET"
}
export interface ParticipantFrame {
    participantId: number;
    position: Position;
    currentGold: number;
    totalGold: number;
    level: number;
    xp: number;
    minionsKilled: number;
    jungleMinionsKilled: number;
    dominionScore?: number;
    teamScore?: number;
}
