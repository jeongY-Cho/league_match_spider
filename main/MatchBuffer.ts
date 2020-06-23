import { MatchSummary } from "./types";

export default class MatchBuffer extends Array<MatchSummary> {
  constructor(public max_size: number) {
    super();
  }

  push = (...items: MatchSummary[]) => {
    // push items to array
    super.push(...items);

    // sort array
    this.sort((a, b) => b.timestamp - a.timestamp);
    // remove extraneous
    this.splice(this.max_size);

    return this.length;
  };
}
