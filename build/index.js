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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSpider = exports.matchSpider = void 0;
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = require("dotenv");
var mongodb_1 = require("mongodb");
var Match_1 = require("./types/Match");
var log = __importStar(require("loglevel"));
var fetchMatchHistory_1 = require("./fetchers/fetchMatchHistory");
var MatchBuffer_1 = require("./MatchBuffer");
var fetchMatchAndTimeline_1 = require("./fetchers/fetchMatchAndTimeline");
var utils_1 = require("./utils");
var findEntry_1 = require("./findEntry");
dotenv_1.config();
log.setLevel(log.levels.DEBUG);
var _a = process.env, RIOT_API_NA = _a.RIOT_API_NA, RIOT_API_KEY = _a.RIOT_API_KEY, FALLBACK_ENTRY = _a.FALLBACK_ENTRY;
if (RIOT_API_NA === undefined ||
    RIOT_API_KEY === undefined ||
    FALLBACK_ENTRY === undefined) {
    throw "no key or url or entry";
}
axios_1.default.defaults.headers.common["X-Riot-Token"] = RIOT_API_KEY;
var MONGO_URI = "mongodb://localhost:20000";
var leagueDB = "league";
var matchesColl = "matches";
var timelineColl = "timelines";
var analysisColl = "analysis";
function matchSpider(RIOT_API_REGION) {
    return __awaiter(this, void 0, void 0, function () {
        var FEATURED_GAMES_URL, matchBuffer, client, League, Matches, Timelines, targetMatch, targetGameId, _a, _b, matchRes, timelineRes, timeline, err_1, randomAccount, matchHistory, err_2, err_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    FEATURED_GAMES_URL = "";
                    matchBuffer = new MatchBuffer_1.MatchBuffer(1000);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 19, , 20]);
                    // connect to Mongo.
                    log.debug("Connecting to mongoDb at " + MONGO_URI);
                    return [4 /*yield*/, mongodb_1.MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })];
                case 2:
                    client = _c.sent();
                    log.info("Connected to mongoDb at " + MONGO_URI);
                    League = client.db(leagueDB);
                    Matches = League.collection(matchesColl);
                    Timelines = League.collection(timelineColl);
                    log.info("Connected to collections: matches, timelines, analysis");
                    log.info("Beginning Crawl");
                    _c.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 18];
                    targetMatch = matchBuffer.shift();
                    _a = (targetMatch === null || targetMatch === void 0 ? void 0 : targetMatch.gameId);
                    if (_a) return [3 /*break*/, 5];
                    return [4 /*yield*/, findEntry_1.findEntry(Matches, RIOT_API_REGION, FEATURED_GAMES_URL)];
                case 4:
                    _a = (_c.sent());
                    _c.label = 5;
                case 5:
                    targetGameId = _a;
                    log.debug("matchFrom Buffer:", targetMatch === null || targetMatch === void 0 ? void 0 : targetMatch.gameId, targetMatch === null || targetMatch === void 0 ? void 0 : targetMatch.queue);
                    if (!(targetMatch &&
                        (targetMatch === null || targetMatch === void 0 ? void 0 : targetMatch.queue) !== Match_1.QueueID.Solo_SR &&
                        (targetMatch === null || targetMatch === void 0 ? void 0 : targetMatch.queue) !== Match_1.QueueID.Flex_SR)) return [3 /*break*/, 6];
                    // if match isn't ranked: skip
                    log.debug("targetMatch: " + targetMatch.gameId + " is not Ranked; skipping");
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, utils_1.existsInCollection(Matches)({ gameId: targetGameId })];
                case 7:
                    if (_c.sent()) {
                        // if match is already in db: skip
                        log.debug(targetGameId + " is already in Db; skipping");
                        return [3 /*break*/, 3];
                    }
                    _c.label = 8;
                case 8: return [4 /*yield*/, fetchMatchAndTimeline_1.fetchMatchAndTimeline(targetGameId, RIOT_API_REGION)];
                case 9:
                    _b = _c.sent(), matchRes = _b[0], timelineRes = _b[1];
                    // if match is less than 15 minutes: continue to next match;
                    if (matchRes.data.gameDuration < 900) {
                        log.debug("match " + targetGameId + " is too short; game duration: " + matchRes.data.gameDuration);
                        return [3 /*break*/, 3];
                    }
                    timeline = Object.assign({}, timelineRes.data, {
                        gameId: matchRes.data.gameId,
                    });
                    _c.label = 10;
                case 10:
                    _c.trys.push([10, 12, , 13]);
                    // insert into database
                    return [4 /*yield*/, Promise.all([
                            Timelines.insertOne(timeline),
                            Matches.insertOne(matchRes.data),
                        ])];
                case 11:
                    // insert into database
                    _c.sent();
                    log.info("New Entry: ", matchRes.data.gameId);
                    return [3 /*break*/, 13];
                case 12:
                    err_1 = _c.sent();
                    // catch and log any errors. usually duplicate key error
                    // TODO: error handling for insertions
                    log.warn("Error writing to DB", err_1);
                    return [3 /*break*/, 13];
                case 13:
                    if (!(matchBuffer.length < matchBuffer.max_size - 10)) return [3 /*break*/, 17];
                    randomAccount = matchRes.data.participantIdentities[Math.floor(Math.random() * 10)]
                        .player.accountId;
                    _c.label = 14;
                case 14:
                    _c.trys.push([14, 16, , 17]);
                    return [4 /*yield*/, fetchMatchHistory_1.fetchMatchHistory(randomAccount, RIOT_API_REGION)];
                case 15:
                    matchHistory = _c.sent();
                    // push match history to buffer
                    matchBuffer.push.apply(matchBuffer, matchHistory.data.matches.filter(function (summary) {
                        return (summary.queue === Match_1.QueueID.Solo_SR ||
                            summary.queue === Match_1.QueueID.Flex_SR);
                    }));
                    log.debug("matchBuffer length is now: " + matchBuffer.length);
                    return [3 /*break*/, 17];
                case 16:
                    err_2 = _c.sent();
                    // if theres an error fetching just skip and go next
                    log.info("Error fetching matchHistory for buffer going next", err_2);
                    return [3 /*break*/, 17];
                case 17: return [3 /*break*/, 3];
                case 18: return [3 /*break*/, 20];
                case 19:
                    err_3 = _c.sent();
                    // if error connecting to db log error then exit
                    log.error("Fatal Error. Ending Processes");
                    log.trace(err_3);
                    return [3 /*break*/, 20];
                case 20:
                    // @ts-ignore
                    if (client !== undefined) {
                        client.close();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.matchSpider = matchSpider;
function MatchSpider(options) { }
exports.MatchSpider = MatchSpider;
//# sourceMappingURL=index.js.map