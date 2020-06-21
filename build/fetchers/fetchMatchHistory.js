"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMatchHistory = void 0;
var axios_1 = __importDefault(require("axios"));
var fetchWrapper_1 = require("../fetchWrapper");
function _fetchMatchHistory(accountId, RIOT_API_REGION) {
    var MATCH_HISTORY_ENDPOINT = RIOT_API_REGION + "lol/match/v4/matchlists/by-account/";
    return axios_1.default.get(MATCH_HISTORY_ENDPOINT + accountId);
}
exports.fetchMatchHistory = fetchWrapper_1.fetchWrapper(_fetchMatchHistory);
//# sourceMappingURL=fetchMatchHistory.js.map