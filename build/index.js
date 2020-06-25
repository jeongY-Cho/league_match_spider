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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSpider = void 0;
var types_1 = require("./types");
var dotenv_1 = require("dotenv");
var log = __importStar(require("loglevel"));
var fetchMatchHistory_1 = require("./fetchers/fetchMatchHistory");
var MatchBuffer_1 = __importDefault(require("./MatchBuffer"));
var fetchMatchAndTimeline_1 = require("./fetchers/fetchMatchAndTimeline");
var findEntry_1 = require("./findEntry");
var Regions_1 = require("./Regions");
dotenv_1.config();
function MatchSpider(options) {
    // load from dot env for access in functions
    dotenv_1.config();
    if (process.env.RIOT_API_KEY) {
        // log successfully found
        log.info("Using API key:", process.env.RIOT_API_KEY);
    }
    else {
        log.warn("RIOT_API_KEY not found in .env; terminating");
        throw "RIOT_API_KEY not found in .env; add RIOT_API_KEY to .env and try again";
    }
    // check that region supplied in options
    if (!(options === null || options === void 0 ? void 0 : options.region)) {
        log.warn("region not given");
        throw "Region not specified in options";
    }
    var defaults = {
        fallbackMethod: "featured_game",
        bufferSize: 1000,
        queues: [types_1.QueueID.Flex_SR, types_1.QueueID.Solo_SR],
        max_attempts: 3,
        max_age: 24 * 60 * 60 * 1000,
        duplicateChecker: function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, false];
            }); });
        },
        logging: log.levels.WARN
    };
    var _options = Object.assign(defaults, options);
    log.setLevel(_options.logging);
    return {
        iter: function (max_iter) {
            var _a;
            return __asyncGenerator(this, arguments, function () {
                var matchBuffer, loops, skips, targetMatch, _b, _c, matchRes, timelineRes, randomAccount, matchHistory, err_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            matchBuffer = new MatchBuffer_1.default(_options.bufferSize);
                            log.debug("matchBuffer initialized with max size: " + _options.bufferSize);
                            // debug msg
                            if (_options.entryGameId) {
                                log.info("Starting crawl with entryGame:", _options.entryGameId);
                            }
                            else {
                                log.info("Starting crawl with featured game entry");
                            }
                            loops = 0 // loop counter
                            ;
                            skips = 0;
                            _d.label = 1;
                        case 1:
                            if (!(loops < (max_iter || Infinity))) return [3 /*break*/, 12];
                            log.info("match buffer current length: " + matchBuffer.length);
                            _b = matchBuffer.shift();
                            if (_b) return [3 /*break*/, 3];
                            return [4 /*yield*/, __await(findEntry_1.findEntry(_options.entryGameId, Regions_1.RegionLookup[_options.region], _options.queues, _options.max_age))];
                        case 2:
                            _b = (_d.sent());
                            _d.label = 3;
                        case 3:
                            targetMatch = _b;
                            log.debug("got game:", targetMatch.gameId);
                            // check if entry found:
                            if (!targetMatch) {
                                // if no entry found then loop back and try again
                                return [3 /*break*/, 1];
                            }
                            return [4 /*yield*/, __await(_options.duplicateChecker(targetMatch.gameId))];
                        case 4:
                            // check if match is a duplicate or not
                            if (_d.sent()) {
                                // if is duplicate skip
                                log.debug(targetMatch.gameId + " is a duplicate; skipping...");
                                skips++;
                                if (skips === 1000) {
                                    log.warn("skipped " + skips + " in a row ");
                                }
                                return [3 /*break*/, 1];
                            }
                            else {
                                skips = 0;
                            }
                            return [4 /*yield*/, __await(fetchMatchAndTimeline_1.fetchMatchAndTimeline(targetMatch.gameId, Regions_1.RegionLookup[_options.region]))];
                        case 5:
                            _c = _d.sent(), matchRes = _c[0], timelineRes = _c[1];
                            log.debug("fetched match and timeline data for", targetMatch.gameId);
                            if (!(matchBuffer.length < _options.bufferSize - 20)) return [3 /*break*/, 9];
                            randomAccount = matchRes.data.participantIdentities[Math.floor(Math.random() * matchRes.data.participantIdentities.length)]
                                .player.accountId;
                            log.info("refilling matchBuffer; current length: " + matchBuffer.length);
                            _d.label = 6;
                        case 6:
                            _d.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, __await(fetchMatchHistory_1.fetchMatchHistory(randomAccount, Regions_1.RegionLookup[_options.region]))];
                        case 7:
                            matchHistory = _d.sent();
                            matchHistory.data.matches.forEach(function (match) {
                                if (_options.queues.includes(match.queue)) {
                                    matchBuffer.push(match);
                                }
                            });
                            return [3 /*break*/, 9];
                        case 8:
                            err_1 = _d.sent();
                            if (!((_a = err_1.response) === null || _a === void 0 ? void 0 : _a.code)) {
                                // if the api call returns a response error: it doesn't matter skip it. 
                                throw err_1;
                            }
                            if (err_1.status !== "ECONNREFUSED" && err_1.status !== "ETIMEDOUT") {
                                // if the api call times out or is refused: it doesnt matter skip it
                                throw err_1;
                            }
                            return [3 /*break*/, 9];
                        case 9: return [4 /*yield*/, __await({
                                match: matchRes.data,
                                timeline: timelineRes.data,
                            })];
                        case 10: 
                        // yield result
                        return [4 /*yield*/, _d.sent()];
                        case 11:
                            // yield result
                            _d.sent();
                            loops++;
                            return [3 /*break*/, 1];
                        case 12: return [4 /*yield*/, __await(void 0)];
                        case 13: return [2 /*return*/, _d.sent()];
                    }
                });
            });
        },
    };
}
exports.MatchSpider = MatchSpider;
//# sourceMappingURL=index.js.map