import axios from "axios";
import { mocked } from "ts-jest/utils";
import { ValueOfRegions } from "../..";
import { endpoints } from "../../constants";
import url from "url";
import { fetchMatchHistory } from "../../fetchers/fetchMatchHistory";

jest.mock("axios");

let id1 = "abc";
let id2 = "def";

let region1 = "https://region1.test.com";
let region2 = "https://region2.test.com";

let token1 = "TEST";
let token2 = "TEST2";

let testCases = [
  [id1, region1, token1],
  [id2, region1, token2],
  [id2, region2, token2],
];

beforeAll(() => {
  mocked(axios.get).mockResolvedValue(true);

  process.env.RIOT_API_KEY = testCases[0][2];
  fetchMatchHistory(testCases[0][0], testCases[0][1] as ValueOfRegions);
  process.env.RIOT_API_KEY = testCases[1][2];
  fetchMatchHistory(testCases[1][0], testCases[1][1] as ValueOfRegions);
  process.env.RIOT_API_KEY = testCases[2][2];
  fetchMatchHistory(testCases[2][0], testCases[2][1] as ValueOfRegions);
});

test("test token in header", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[0][1]!.headers).toStrictEqual({ "X-Riot-Token": token1 });
  expect(calls[1][1]!.headers).toStrictEqual({ "X-Riot-Token": token2 });
});

test("test proper endpoint call", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[1][0]).toBe(url.resolve(region1, endpoints.MATCH_HISTORY) + id2);
  expect(calls[2][0]).toBe(url.resolve(region2, endpoints.MATCH_HISTORY) + id2);
});
test("test proper id append", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[0][0]).toBe(url.resolve(region1, endpoints.MATCH_HISTORY) + id1);
  expect(calls[1][0]).toBe(url.resolve(region1, endpoints.MATCH_HISTORY) + id2);
});
