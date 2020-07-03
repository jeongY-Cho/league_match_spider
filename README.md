# League Match Spider

### Mine match data from the RIOT API using nodeJs.

## Quickstart:
This implementation uses async generators to return data for easy import into a database of your choice.

#### *Before you start:* Make sure that you have a riot api key from https://developer.riotgames.com/ and declare it as RIOT_API_KEY in your `.env`

```Typescript
import { MatchSpider } from "LeagueMatchSpider"

const config = {
  region: "NA1"
}
const max_iterations = 10000

// MatchSpider is a factory function that takes in configs and returns an object with the .iter() method.
const matchSpider = MatchSpider(config)

for await (let {match, timeline} of matchSpider.iter(max_iterations)) {
  // ... do something with match and timeline
  // ... import into database or something
  // if you supply a max_iteration argument, the generator will iterate until it 
  // yields that number of games 
}
```

## Installation:
Clone this repo into your own project with ```git clone```.
If you want to build yourself, use ```npm run build```. This will trigger tests and build javascript files into the ```./build``` folder.

## Tests:
Run tests with: 
```Bash
npm test
```

# API:
## `MatchSpider(options)`

- options: [`<MatchSpiderOptions>`](#MatchSpiderOptions)
  - defaults:

  ``` Typescript
    {
      fallbackMethod: "featured_game",
      bufferSize: 1000,
      queues: [QueueID.Flex_SR, QueueID.Solo_SR],
      max_attempts: 3,
      max_age: 24 * 60 * 60 * 1000,
      duplicateChecker: async function(){return false},
      logging: log.levels.WARN
    };
  ```
Returns an object with methods for data collection.

### MatchSpiderOptions Type:
```Typescript
interface MatchSpiderOptions {
  entryMethod: "match" | "featured",
  entryMatchId: number,
  region: RegionOptions;
  bufferSize?: number;
  queues?: QueueID[];
  entryGameId?: number;
  duplicateChecker?: (gameId: number) => (boolean | Promise<boolean>);
  max_iter?: number;
  logging?: log.LogLevelDesc
}
```

### RegionOptions Type:
```typescript
  type RegionOptions = keyof Regions | Regions[keyof Regions]
  interface Regions {
    BR1: "https://br1.api.riotgames.com";
    EUN1: "https://eun1.api.riotgames.com";
    EUW1: "https://euw1.api.riotgames.com";
    JP1: "https://jp1.api.riotgames.com";
    KR: "https://kr.api.riotgames.com";
    LA1: "https://la1.api.riotgames.com";
    LA2: "https://la2.api.riotgames.com";
    NA1: "https://na1.api.riotgames.com";
    OC1: "https://oc1.api.riotgames.com";
    TR1: "https://tr1.api.riotgames.com";
    RU: "https://ru.api.riotgames.com";
    AMERICAS: "https://americas.api.riotgames.com";
    ASIA: "https://asia.api.riotgames.com";
    EUROPE: "https://europe.api.riotgames.com";
  }
```
any key or value of regions can be used for the option

### QueueID Enum:
```typescript
enum QueueID {
  CustomGames = 0,
  Snowdown_1v1 = 72,
  Snowdown_2v2 = 73,
  Hexakill_SR = 75,
  URF = 76,
  OneForAll_Mirror = 78,
  URF_vs_AI = 83,
  Hexakill_TT = 98,
  ARAM_ButchersBridge = 100,
  Nemesis = 310,
  BlackMarketBrawlers = 313,
  DefinitelyNotDominion = 317,
  AllRandom_SR = 325,
  Draft_SR = 400,
  Solo_SR = 420,
  Blind_SR = 430,
  Flex_SR = 440,
  ARAM_HA = 450,
  BloodHuntAssassin = 600,
}
```

#### Notes on options:
  - MatchSpider iterator needs an entry point. By default it is using the featured games endpoint. If `options.entryMethod === "match"`, you must specify an entryGameId to start iteration, else the iterator will fallback to the featured game endpoint instead.
  - `options.duplicateChecker` is a(n) (async) function that takes a gameId and decides whether or not to return that game in the iterator. If the gameId already exists then return `true`, else return `false`. By default iterator will return all games whether or not its been returned before. 
    - Example: take gameId and check whether or not its been inserted into the database. return `true` if already in database and return `false` if its not. 
  - logging uses this simple package found here: https://github.com/pimterry/loglevel. The options for logging here are the same as from this package.

## `MatchSpider.iter([max_iterations])`
  - max_iterations (optional): `<number>`
    - default: `Infinity`
  
Returns an asynchronous generator object that can be used in a for loop or while loop, etc. Returns for each iteration is a object with both the match and timeline data associated with that match. Type of these can be found on the Riot API documentation.