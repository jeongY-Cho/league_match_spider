"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFeaturedMatches = void 0;
var axios_1 = __importDefault(require("axios"));
var fetchWrapper_1 = require("./fetchWrapper");
var url_1 = __importDefault(require("url"));
var constants_1 = require("../constants");
function _fetchFeaturedMatches(u, region) {
    var featuredGamesEndpoint = url_1.default.resolve(region, constants_1.endpoints.FEATURED_MATCHES);
    return axios_1.default.get(featuredGamesEndpoint, {
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY,
        },
    });
}
exports.fetchFeaturedMatches = fetchWrapper_1.fetchWrapper(_fetchFeaturedMatches);
//# sourceMappingURL=fetchFeaturedMatches.js.map