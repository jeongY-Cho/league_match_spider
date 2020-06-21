"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTimeline = exports._fetchTimeline = void 0;
var axios_1 = __importDefault(require("axios"));
var fetchWrapper_1 = require("../fetchWrapper");
function _fetchTimeline(match, RIOT_API_REGION) {
    var MATCH_ENDPOINT = RIOT_API_REGION + "lol/match/v4/timelines/by-match/";
    return axios_1.default.get(MATCH_ENDPOINT + match);
}
exports._fetchTimeline = _fetchTimeline;
exports.fetchTimeline = fetchWrapper_1.fetchWrapper(_fetchTimeline);
//# sourceMappingURL=fetchTimeline.js.map