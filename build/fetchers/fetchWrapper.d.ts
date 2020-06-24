export declare function fetchWrapper<A, B, R>(fn: (gameIdOrRegion: A, region: B) => Promise<R>, max_attempts?: number): (id: A, region: B) => Promise<R>;
