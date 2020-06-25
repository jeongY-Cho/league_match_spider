import { MatchSpider } from "../index";
import axios from "axios";
import { mocked } from "ts-jest/utils";
import { QueueID } from "../types";
import { Regions } from "../Regions";
import { boolean } from "mathjs";
import log from "loglevel";

jest.mock("axios");

const now = Date.now();
mocked(axios.get).mockResolvedValue({
  data: {
    matches: [
      { timestamp: now, queue: QueueID.ARAM_ButchersBridge, gameId: 1000 },
      { timestamp: now - 1001, queue: QueueID.Flex_SR, gameId: 2000 },
    ],
    gameList: [{ participants: [{ summonerName: "abc" }], gameId: 1000}],
    accountId: "abc",
    participantIdentities: [
      {
        player: {
          accountId: 123,
        },
      },
    ],
  },
  headers: {
    "X-App-Rate-Limit": "test:test"
  }
});

test("check for RIOT_API_KEY in process.env", () => {
  process.env.RIOT_API_KEY = "";

  expect(() => {
    MatchSpider({
      region: "NA1",
    });
  }).toThrow();
});
test("check for region in options", () => {
  expect(() => {
    process.env.RIOT_API_KEY = "TEST";
    // @ts-ignore
    MatchSpider();
  }).toThrow();
});

test("test return object for properties", () => {
  process.env.RIOT_API_KEY = "TEST";
  let matchSpider = MatchSpider({
    region: "NA1",
  });
  expect(matchSpider).toMatchObject({
    iter: expect.any(Function),
  });
});

test("test iter returns something", async () => {
  process.env.RIOT_API_KEY = "TEST";
  let matchSpider = MatchSpider({
    region: "NA1",
  });

  let crawler = matchSpider.iter();
  let one = await crawler.next();
  expect(one).toHaveProperty("value");
  expect(one.value).toHaveProperty("timeline");
  expect(one.value).toHaveProperty("match");
});

test("test iter terminates if given max_iteration", async () => {
  process.env.RIOT_API_KEY = "TEST";
  let matchSpider = MatchSpider({
    region: "NA1",
  });

  let count = 0;
  for await (let each of matchSpider.iter(10)) {
    count++;
  }
  expect(count).toBe(10);

  let rand = Math.floor(Math.random() * 100);
  count = 0;
  for await (let each of matchSpider.iter(rand)) {
    count++;
  }
  expect(count).toBe(rand);
});

test("test duplicateChecker", async () => {
  process.env.RIOT_API_KEY = "TEST";
    let i = 0

  let config = {
      logging: log.levels.SILENT,
    region: Regions.NA1,
    duplicateChecker: jest.fn((id: any) => {
        i ++
      return boolean(10-i) as boolean;
    }),
  };

  let matchSpider = MatchSpider(config);
  let iter = matchSpider.iter()
  await iter.next()

  expect(mocked(axios.get).mock.calls.length).toBeGreaterThan(10)
});
