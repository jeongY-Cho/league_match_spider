"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEntry = void 0;
var fetchMatch_1 = require("./fetchers/fetchMatch");
var fetchMatchHistory_1 = require("./fetchers/fetchMatchHistory");
var fetchFeaturedMatches_1 = require("./fetchers/fetchFeaturedMatches");
var fetchAccountInfo_1 = require("./fetchers/fetchAccountInfo");
var loglevel_1 = __importDefault(require("loglevel"));
function findEntry(entryGameId, RIOT_API_REGION, queues, max_age) {
    var _a;
    if (max_age === void 0) { max_age = 48 * 60 * 60 * 1000; }
    return __awaiter(this, void 0, void 0, function () {
        function matchFilter(match) {
            return (queues.includes(match.queue) &&
                match.timestamp >= Date.now() - max_age - 1000);
        }
        var summonerNames, match, featuredGames, matchesSummary, _i, summonerNames_1, summonerName, accountId, history_1, _b, _c, match, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    summonerNames = [];
                    if (!entryGameId) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchMatch_1.fetchMatch(entryGameId, RIOT_API_REGION)];
                case 1:
                    match = _d.sent();
                    summonerNames = match.data.participantIdentities.map(function (participant) {
                        return participant.player.summonerName;
                    });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetchFeaturedMatches_1.fetchFeaturedMatches(undefined, RIOT_API_REGION)];
                case 3:
                    featuredGames = _d.sent();
                    matchesSummary = featuredGames.data.gameList;
                    matchesSummary.forEach(function (match) {
                        return match.participants.forEach(function (participant) {
                            summonerNames.push(participant.summonerName);
                        });
                    });
                    _d.label = 4;
                case 4:
                    _i = 0, summonerNames_1 = summonerNames;
                    _d.label = 5;
                case 5:
                    if (!(_i < summonerNames_1.length)) return [3 /*break*/, 11];
                    summonerName = summonerNames_1[_i];
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 9, , 10]);
                    return [4 /*yield*/, fetchAccountInfo_1.fetchAccountInfo(summonerName, RIOT_API_REGION)];
                case 7:
                    accountId = (_d.sent()).data
                        .accountId;
                    return [4 /*yield*/, fetchMatchHistory_1.fetchMatchHistory(accountId, RIOT_API_REGION)];
                case 8:
                    history_1 = _d.sent();
                    for (_b = 0, _c = history_1.data.matches; _b < _c.length; _b++) {
                        match = _c[_b];
                        if (matchFilter(match)) {
                            return [2 /*return*/, match];
                        }
                    }
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _d.sent();
                    if ([403, 405, 415, 401].includes((_a = err_1.response) === null || _a === void 0 ? void 0 : _a.code)) {
                        // only throw error if its one of these kinds of errors
                        loglevel_1.default.warn(err_1);
                        throw err_1;
                    }
                    return [3 /*break*/, 10];
                case 10:
                    _i++;
                    return [3 /*break*/, 5];
                case 11: 
                // if nothing found throw error
                throw "No match found with given params";
            }
        });
    });
}
exports.findEntry = findEntry;
//# sourceMappingURL=findEntry.js.map