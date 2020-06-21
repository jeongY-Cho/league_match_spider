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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNewMatchFromMatch = void 0;
var Match_1 = require("./types/Match");
var log = __importStar(require("loglevel"));
var fetchMatchHistory_1 = require("./fetchers/fetchMatchHistory");
var findEntry_1 = require("./findEntry");
var utils_1 = require("./utils/");
function findNewMatchFromMatch(aMatch, max_age, Matches, RIOT_API_REGION) {
    var _a;
    if (max_age === void 0) { max_age = 24 * 60 * 60 * 1000; }
    return __awaiter(this, void 0, void 0, function () {
        var _i, _b, participant, matchHistory, err_1, _c, _d, _e, foundMatch;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _i = 0, _b = aMatch.participantIdentities;
                    _f.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 18];
                    participant = _b[_i];
                    matchHistory = void 0;
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 4, , 13]);
                    return [4 /*yield*/, fetchMatchHistory_1.fetchMatchHistory(participant.player.accountId, RIOT_API_REGION)];
                case 3:
                    matchHistory = _f.sent();
                    return [3 /*break*/, 13];
                case 4:
                    err_1 = _f.sent();
                    _c = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.status;
                    switch (_c) {
                        case 429: return [3 /*break*/, 5];
                        case 400: return [3 /*break*/, 8];
                        case 403: return [3 /*break*/, 8];
                        case 404: return [3 /*break*/, 8];
                        case 405: return [3 /*break*/, 8];
                        case 415: return [3 /*break*/, 8];
                        case 504: return [3 /*break*/, 9];
                        case 401: return [3 /*break*/, 9];
                        case 500: return [3 /*break*/, 9];
                        case 502: return [3 /*break*/, 9];
                        case 503: return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, findEntry_1.asyncWait(parseInt(err_1.response.headers["retry-after"]))];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, fetchMatchHistory_1.fetchMatchHistory(participant.player.accountId, RIOT_API_REGION)];
                case 7:
                    matchHistory = _f.sent();
                    return [3 /*break*/, 12];
                case 8: return [3 /*break*/, 17];
                case 9:
                    if (!(err_1.code === "ETIMEDOUT")) return [3 /*break*/, 11];
                    return [4 /*yield*/, fetchMatchHistory_1.fetchMatchHistory(participant.player.accountId, RIOT_API_REGION)];
                case 10:
                    matchHistory = _f.sent();
                    return [3 /*break*/, 12];
                case 11:
                    console.log("line 354");
                    throw err_1;
                case 12: return [3 /*break*/, 13];
                case 13:
                    _d = 0, _e = matchHistory.data.matches;
                    _f.label = 14;
                case 14:
                    if (!(_d < _e.length)) return [3 /*break*/, 17];
                    foundMatch = _e[_d];
                    if (foundMatch.timestamp < Date.now() - max_age) {
                        // if a game is older than max age break out of loop.
                        // return of api response is sorted by timestamp descending
                        log.debug("game too old; skipping");
                        return [3 /*break*/, 17];
                    }
                    return [4 /*yield*/, utils_1.existsInCollection(Matches)({
                            gameId: foundMatch.gameId,
                        })];
                case 15:
                    // search for found match in database
                    if (_f.sent()) {
                        // if exists continue to next match
                        log.debug("game exists in db; skipping");
                        return [3 /*break*/, 16];
                    }
                    else {
                        if (foundMatch.queue === Match_1.QueueID.Solo_SR ||
                            foundMatch.queue === Match_1.QueueID.Flex_SR) {
                            // if the result is a ranked game return it, else continue
                            log.debug("found new match: " + foundMatch.gameId);
                            return [2 /*return*/, foundMatch.gameId];
                        }
                    }
                    _f.label = 16;
                case 16:
                    _d++;
                    return [3 /*break*/, 14];
                case 17:
                    _i++;
                    return [3 /*break*/, 1];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.findNewMatchFromMatch = findNewMatchFromMatch;
//# sourceMappingURL=findNewMatchFromMatch.js.map