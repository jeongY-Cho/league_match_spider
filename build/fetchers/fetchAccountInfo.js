"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccountInfo = void 0;
var fetchWrapper_1 = require("./fetchWrapper");
var constants_1 = require("../constants");
var url_1 = __importDefault(require("url"));
var axios_1 = __importDefault(require("axios"));
function _fetchAccountInfo(id, REGION) {
    var endpoint = encodeURI(url_1.default.resolve(REGION, constants_1.endpoints.ACCOUNT_INFO + id));
    return axios_1.default.get(endpoint, {
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY
        }
    });
}
exports.fetchAccountInfo = fetchWrapper_1.fetchWrapper(_fetchAccountInfo);
//# sourceMappingURL=fetchAccountInfo.js.map