"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchBuffer = void 0;
var MatchBuffer = /** @class */ (function (_super) {
    __extends(MatchBuffer, _super);
    function MatchBuffer(max_size) {
        var _this = _super.call(this, 0) || this;
        _this.max_size = max_size;
        _this.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            // push items to array
            _super.prototype.push.apply(_this, items);
            // sort array
            _this.sort(function (a, b) { return b.timestamp - a.timestamp; });
            // remove extraneous
            _this.splice(_this.max_size);
            return _this.length;
        };
        return _this;
    }
    return MatchBuffer;
}(Array));
exports.MatchBuffer = MatchBuffer;
//# sourceMappingURL=MatchBuffer.js.map