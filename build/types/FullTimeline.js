"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardType = exports.Type = exports.LevelUpType = exports.LaneType = exports.BuildingType = void 0;
var BuildingType;
(function (BuildingType) {
    BuildingType["InhibitorBuilding"] = "INHIBITOR_BUILDING";
    BuildingType["TowerBuilding"] = "TOWER_BUILDING";
})(BuildingType = exports.BuildingType || (exports.BuildingType = {}));
var LaneType;
(function (LaneType) {
    LaneType["BotLane"] = "BOT_LANE";
    LaneType["MidLane"] = "MID_LANE";
    LaneType["TopLane"] = "TOP_LANE";
})(LaneType = exports.LaneType || (exports.LaneType = {}));
var LevelUpType;
(function (LevelUpType) {
    LevelUpType["Normal"] = "NORMAL";
})(LevelUpType = exports.LevelUpType || (exports.LevelUpType = {}));
var Type;
(function (Type) {
    Type["BuildingKill"] = "BUILDING_KILL";
    Type["ChampionKill"] = "CHAMPION_KILL";
    Type["EliteMonsterKill"] = "ELITE_MONSTER_KILL";
    Type["ItemDestroyed"] = "ITEM_DESTROYED";
    Type["ItemPurchased"] = "ITEM_PURCHASED";
    Type["ItemSold"] = "ITEM_SOLD";
    Type["ItemUndo"] = "ITEM_UNDO";
    Type["SkillLevelUp"] = "SKILL_LEVEL_UP";
    Type["WardKill"] = "WARD_KILL";
    Type["WardPlaced"] = "WARD_PLACED";
})(Type = exports.Type || (exports.Type = {}));
var WardType;
(function (WardType) {
    WardType["ControlWard"] = "CONTROL_WARD";
    WardType["SightWard"] = "SIGHT_WARD";
    WardType["Undefined"] = "UNDEFINED";
    WardType["YellowTrinket"] = "YELLOW_TRINKET";
})(WardType = exports.WardType || (exports.WardType = {}));
//# sourceMappingURL=FullTimeline.js.map