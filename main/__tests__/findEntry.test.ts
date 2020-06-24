import { findEntry } from "../findEntry";
import axios from "axios";
import { mocked } from "ts-jest/utils";
import { ValueOfRegions } from "..";
import { QueueID } from "../types";

jest.mock("axios");


let now = Date.now()
mocked(axios.get).mockResolvedValue({
  data: {
    matches: [
      {timestamp: now, queue: QueueID.ARAM_ButchersBridge},
      {timestamp: now - 1001, queue: QueueID.Flex_SR}
    ],
    gameList: [{ participants: [
      {summonerName: "abc"}
    ] }],
    accountId: "abc",
    participantIdentities: [{
      player: {
        accountId: 123
      }
    }],
  },
});

test("test without id", async () => {

  let res = await findEntry(
    undefined,
    "https://test1.api.riotgames.com" as ValueOfRegions,
    [QueueID.Flex_SR]
  );
  expect(axios.get).toBeCalledTimes(3);
  expect(res).toMatchObject({
    timestamp: now - 1001, 
    queue: QueueID.Flex_SR
  })
});

test("test with id", async () => {
  jest.clearAllMocks()
  let res = await findEntry(
    123,
    "https://test1.api.riotgames.com" as ValueOfRegions,
    [QueueID.Flex_SR]
  );
  expect(axios.get).toBeCalledTimes(3);
  expect(res).toMatchObject({
    timestamp: now - 1001,
    queue: QueueID.Flex_SR,
  });
});

test("test non default max_age", async done => {
  let spyNow = jest.spyOn(global.Date, "now").mockReturnValue(now)
  
  jest.clearAllMocks()
  findEntry(
        123,
        "https://test1.api.riotgames.com" as ValueOfRegions,
        [ QueueID.Flex_SR  ],
        0
      ).catch(err=>{
        expect(err).toMatch(/No match found/i)
        expect(axios.get).toBeCalledTimes(3);
        done()
      })
});


test("test queue filter", async () => {
  let spyNow = jest.spyOn(global.Date, "now").mockReturnValue(now)
  jest.clearAllMocks()
  let res1 = await findEntry(
    123,
    "https://test1.api.riotgames.com" as ValueOfRegions,
    [ QueueID.Flex_SR  ],
    
  );
  expect(axios.get).toBeCalledTimes(3);
  expect(res1).toMatchObject({
    timestamp: now - 1001,
    queue: QueueID.Flex_SR
  })

  jest.clearAllMocks()
  let res2 = await findEntry(
    123,
    "https://test1.api.riotgames.com" as ValueOfRegions,
    [ QueueID.ARAM_ButchersBridge  ],
    
  );
  expect(axios.get).toBeCalledTimes(3);
  expect(res2).toMatchObject({
    timestamp: now,
    queue: QueueID.ARAM_ButchersBridge,
  });});
