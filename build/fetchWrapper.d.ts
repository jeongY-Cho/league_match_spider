export declare function fetchWrapper<A, B, R>(fn: (gameId: A, region: B) => Promise<R>, max_attempts?: number): (gameId: A, region: B) => Promise<R>;
