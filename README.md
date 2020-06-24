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