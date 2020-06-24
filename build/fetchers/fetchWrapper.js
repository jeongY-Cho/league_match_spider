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
exports.fetchWrapper = void 0;
var log = __importStar(require("loglevel"));
var utils_1 = require("../utils");
function fetchWrapper(fn, max_attempts) {
    if (max_attempts === void 0) { max_attempts = 3; }
    return function (id, region) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 17]);
                        log.debug(fn.name + " called");
                        log.trace(fn.name + " called with " + id);
                        return [4 /*yield*/, fn(id, region)];
                    case 1:
                        res = _c.sent();
                        // @ts-ignore
                        log.debug(fn.name + " returned from call with: " + id);
                        return [2 /*return*/, res];
                    case 2:
                        err_1 = _c.sent();
                        _b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.status;
                        switch (_b) {
                            case 429: return [3 /*break*/, 3];
                            case 400: return [3 /*break*/, 5];
                            case 403: return [3 /*break*/, 6];
                            case 404: return [3 /*break*/, 7];
                            case 405: return [3 /*break*/, 8];
                            case 415: return [3 /*break*/, 9];
                            case 401: return [3 /*break*/, 10];
                            case 500: return [3 /*break*/, 11];
                            case 502: return [3 /*break*/, 12];
                            case 504: return [3 /*break*/, 13];
                            case 503: return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 15];
                    case 3:
                        // Rate limit Reached
                        log.info("[429] Rate Limit Reached");
                        return [4 /*yield*/, utils_1.asyncWait(parseInt(err_1.response.headers["retry-after"]) + 1)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 16];
                    case 5:
                        // Bad Request
                        log.warn("[400] Bad Request; on " + fn.name + " and " + id);
                        return [3 /*break*/, 16];
                    case 6:
                        // Forbidden
                        log.warn("[403] Forbidden; on " + fn.name + " and " + id);
                        throw err_1;
                    case 7:
                        // Data not found
                        log.debug("[404] Data not found; on " + fn.name + " and " + id);
                        throw err_1;
                    case 8:
                        // Method not allowed
                        log.warn("[405] Method not allowed; on " + fn.name + " and " + id);
                        throw err_1;
                    case 9:
                        // Unsupported Media Type
                        log.warn("[415] Unsupported Media Type; on " + fn.name + " and " + id);
                        throw err_1;
                    case 10:
                        // Unauthorized
                        log.error("[405] Unauthorized; on " + fn.name + " and " + id);
                        throw err_1;
                    case 11:
                        // Internal Server Error
                        log.warn("[500] Internal Server Error; on " + fn.name + " and " + id);
                        return [3 /*break*/, 16];
                    case 12:
                        // Bad Gateway
                        log.warn("[502] Bad Gateway; on " + fn.name + " and " + id);
                        return [3 /*break*/, 16];
                    case 13:
                        // Service Unavailable
                        log.warn("[504] Service Unavailable; on " + fn.name + " and " + id);
                        return [3 /*break*/, 16];
                    case 14:
                        // Gateway Timeout
                        log.warn("[503] Gateway Timeout; on " + fn.name + " and " + id);
                        return [3 /*break*/, 16];
                    case 15:
                        switch (err_1.code) {
                            // switch cases for axios err
                            case "ECONNREFUSED":
                                log.error("ECONNREFUSED; on " + fn.name + " and " + id);
                                log.trace();
                                break;
                            case "ETIMEDOUT":
                                log.error("ETIMEDOUT; on " + fn.name + " and " + id);
                                log.trace();
                                break;
                            default:
                                throw err_1;
                        }
                        _c.label = 16;
                    case 16:
                        if (max_attempts - 1) {
                            log.debug("Retrying on " + fn.name + " and " + id + "; attempts left: ", max_attempts - 1);
                            return [2 /*return*/, fetchWrapper(fn, max_attempts - 1)(id, region)];
                        }
                        else {
                            log.error("Max Attempts on " + fn.name + " and " + id);
                            throw err_1;
                        }
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
}
exports.fetchWrapper = fetchWrapper;
//# sourceMappingURL=fetchWrapper.js.map