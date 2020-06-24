"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var match = _1.MatchSpider({
    region: "NA1"
});
var itr = match.iter(10);
itr.next().then(function (res) {
    console.log(res);
});
//# sourceMappingURL=test.js.map