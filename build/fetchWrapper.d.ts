export declare function fetchWrapper<A, B, R>(fn: (gameIdOrRegion: A, region: B) => Promise<R>, max_attempts?: number): (gameId: A, region: B) => Promise<R>;
