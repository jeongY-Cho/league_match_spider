import { MatchSummary } from "./types";
export default class MatchBuffer extends Array<MatchSummary> {
    max_size: number;
    constructor(max_size: number);
    push: (...items: MatchSummary[]) => number;
}
