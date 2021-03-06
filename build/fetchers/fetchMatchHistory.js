"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMatchHistory = void 0;
var axios_1 = __importDefault(require("axios"));
var fetchWrapper_1 = require("./fetchWrapper");
var constants_1 = require("../constants");
var url_1 = __importDefault(require("url"));
function _fetchMatchHistory(accountId, RIOT_API_REGION) {
    var MATCH_HISTORY_ENDPOINT = url_1.default.resolve(RIOT_API_REGION, constants_1.endpoints.MATCH_HISTORY);
    return axios_1.default.get(MATCH_HISTORY_ENDPOINT + accountId, {
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY
        }
    });
}
exports.fetchMatchHistory = fetchWrapper_1.fetchWrapper(_fetchMatchHistory);
//# sourceMappingURL=fetchMatchHistory.js.map