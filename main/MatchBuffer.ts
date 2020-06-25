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

    // remove any duplicates
    let last = Infinity
    for (let i =0; i < this.length; i++) {
      if (this[i].timestamp >= last) {
        // since array is already sorted by timestamp
        // if timestamp of a later game is the same or equal to a previous one it must be a duplicate
        this.splice(i,1)
      }
      last = this[i].timestamp
    }

    // remove extraneous
    this.splice(this.max_size);



    return this.length;
  };
}
