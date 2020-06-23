"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMatch = void 0;
var axios_1 = __importDefault(require("axios"));
var fetchWrapper_1 = require("../fetchWrapper");
var url_1 = __importDefault(require("url"));
function _fetchMatch(match, RIOT_API_REGION) {
    var MATCH_ENDPOINT = url_1.default.resolve(RIOT_API_REGION, "lol/match/v4/matches/");
    return axios_1.default.get(MATCH_ENDPOINT + match);
}
exports.fetchMatch = fetchWrapper_1.fetchWrapper(_fetchMatch);
//# sourceMappingURL=fetchMatch.js.map