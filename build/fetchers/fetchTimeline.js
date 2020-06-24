"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTimeline = exports._fetchTimeline = void 0;
var axios_1 = __importDefault(require("axios"));
var fetchWrapper_1 = require("./fetchWrapper");
var constants_1 = require("../constants");
var url_1 = __importDefault(require("url"));
function _fetchTimeline(match, RIOT_API_REGION) {
    var MATCH_ENDPOINT = url_1.default.resolve(RIOT_API_REGION, constants_1.endpoints.TIMELINE);
    return axios_1.default.get(MATCH_ENDPOINT + match, {
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY
        }
    });
}
exports._fetchTimeline = _fetchTimeline;
exports.fetchTimeline = fetchWrapper_1.fetchWrapper(_fetchTimeline);
//# sourceMappingURL=fetchTimeline.js.map