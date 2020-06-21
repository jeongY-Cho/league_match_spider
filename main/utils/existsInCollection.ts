import { Collection, FilterQuery } from "mongodb";

export function existsInCollection<T>(collection: Collection<T>) {
  return async function (searchParams: FilterQuery<T>) {
    let search = await collection.findOne<T>(searchParams);
    return Boolean(search);
  };
}
