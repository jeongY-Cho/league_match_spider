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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
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
var _b = process.env, RIOT_API_NA = _b.RIOT_API_NA, RIOT_API_KEY = _b.RIOT_API_KEY, FALLBACK_ENTRY = _b.FALLBACK_ENTRY;
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
var Regions;
(function (Regions) {
    Regions[Regions["BR1"] = 0] = "BR1";
    Regions[Regions["EUN1"] = 1] = "EUN1";
    Regions[Regions["EUW1"] = 2] = "EUW1";
    Regions[Regions["JP1"] = 3] = "JP1";
    Regions[Regions["KR"] = 4] = "KR";
    Regions[Regions["LA1"] = 5] = "LA1";
    Regions[Regions["LA2"] = 6] = "LA2";
    Regions[Regions["NA1"] = 7] = "NA1";
    Regions[Regions["OC1"] = 8] = "OC1";
    Regions[Regions["TR1"] = 9] = "TR1";
    Regions[Regions["RU"] = 10] = "RU";
})(Regions || (Regions = {}));
var RegionLookup = (_a = {},
    _a[Regions.BR1] = "https://br1.api.riotgames.com",
    _a[Regions.EUN1] = "https://eun1.api.riotgames.com",
    _a[Regions.EUW1] = "https://euw1.api.riotgames.com",
    _a[Regions.JP1] = "https://jp1.api.riotgames.com",
    _a[Regions.KR] = "https://kr.api.riotgames.com",
    _a[Regions.LA1] = "https://la1.api.riotgames.com",
    _a[Regions.LA2] = "https://la2.api.riotgames.com",
    _a[Regions.NA1] = "https://na1.api.riotgames.com",
    _a[Regions.OC1] = "https://oc1.api.riotgames.com",
    _a[Regions.TR1] = "https://tr1.api.riotgames.com",
    _a[Regions.RU] = "https://ru.api.riotgames.com",
    _a);
function MatchSpider(options) {
    // load from dot env for access in functions
    dotenv_1.config();
    if (process.env.RIOT_API_KEY) {
        log.info("Using API key:", process.env.RIOT_API_KEY);
    }
    else {
        log.warn("RIOT_API_KEY not found in .env");
        throw "RIOT_API_KEY not found in .env";
    }
    var FREATURED_GAMES_URL = "";
    var defaults = {
        fallbackMethod: "featured_game",
        bufferSize: 1000,
        queues: [Match_1.QueueID.Flex_SR, Match_1.QueueID.Solo_SR],
        max_attempts: 3,
        max_age: 24 * 60 * 60 * 1000,
        entryGameId: undefined,
        duplicateChecker: function () { return false; },
    };
    var _options = Object.assign(defaults, options);
    return {
        iter: function () {
            return __asyncGenerator(this, arguments, function () {
                var matchBuffer, targetMatch, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            matchBuffer = new MatchBuffer_1.MatchBuffer(_options.bufferSize);
                            log.debug("matchBuffer initialized with max size: " + _options.bufferSize);
                            if (_options.entryGameId) {
                                log.info("Starting crawl with entryGame:", _options.entryGameId);
                            }
                            else {
                                log.info("Starting crawl with featured game entry");
                            }
                            _b.label = 1;
                        case 1:
                            if (!true) return [3 /*break*/, 6];
                            _a = matchBuffer.shift();
                            if (_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, __await(findEntry_1.findEntry(_options.entryGameId, RegionLookup[_options.region], FREATURED_GAMES_URL, _options.max_age))];
                        case 2:
                            _a = (_b.sent());
                            _b.label = 3;
                        case 3:
                            targetMatch = _a;
                            return [4 /*yield*/, __await(3)];
                        case 4: 
                        // get the game
                        return [4 /*yield*/, _b.sent()];
                        case 5:
                            // get the game
                            _b.sent();
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
    };
}
exports.MatchSpider = MatchSpider;
function main() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var test, _b, _c, each, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    test = MatchSpider({
                        region: Regions.NA1,
                        fallbackMethod: "match",
                        matchId: "abc",
                        mongoURI: "abc",
                        collectionName: "c",
                        dbName: "3",
                    });
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _b = __asyncValues(test.iter());
                    _d.label = 2;
                case 2: return [4 /*yield*/, _b.next()];
                case 3:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                    each = _c.value;
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_b)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map