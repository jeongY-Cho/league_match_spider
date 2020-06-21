import { Collection, FilterQuery } from "mongodb";
export declare function existsInCollection<T>(collection: Collection<T>): (searchParams: FilterQuery<T>) => Promise<boolean>;
