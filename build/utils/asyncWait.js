"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWait = void 0;
function asyncWait(secs) {
    console.log("Waiting " + secs);
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, secs * 1000);
    });
}
exports.asyncWait = asyncWait;
//# sourceMappingURL=asyncWait.js.map