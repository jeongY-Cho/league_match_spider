"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedMatchesResponse = __importStar(require("./FeaturedMatchesResponse"));
var FullTimeline_1 = require("./FullTimeline");
Object.defineProperty(exports, "BuildingType", { enumerable: true, get: function () { return FullTimeline_1.BuildingType; } });
Object.defineProperty(exports, "LaneType", { enumerable: true, get: function () { return FullTimeline_1.LaneType; } });
Object.defineProperty(exports, "LevelUpType", { enumerable: true, get: function () { return FullTimeline_1.LevelUpType; } });
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return FullTimeline_1.Type; } });
Object.defineProperty(exports, "WardType", { enumerable: true, get: function () { return FullTimeline_1.WardType; } });
var Match_1 = require("./Match");
Object.defineProperty(exports, "PlatformID", { enumerable: true, get: function () { return Match_1.PlatformID; } });
Object.defineProperty(exports, "QueueID", { enumerable: true, get: function () { return Match_1.QueueID; } });
var MatchHistory_1 = require("./MatchHistory");
Object.defineProperty(exports, "Lane", { enumerable: true, get: function () { return MatchHistory_1.Lane; } });
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return MatchHistory_1.Role; } });
//# sourceMappingURL=index.js.map