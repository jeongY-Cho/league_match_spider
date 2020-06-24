import axios from "axios";
import { mocked } from "ts-jest/utils";
import { ValueOfRegions } from "../..";
import { endpoints } from "../../constants";
import url from "url";
import { fetchFeaturedMatches } from "../../fetchers/fetchFeaturedMatches";

jest.mock("axios");

let id2 = "def";

let region1 = "https://region1.test.com";
let region2 = "https://region2.test.com";

let token1 = "TEST";
let token2 = "TEST2";

let testCases = [
  [region1, token1],
  [region1, token2],
  [region2, token2],
];

beforeAll(() => {
  mocked(axios.get).mockResolvedValue(true);

  process.env.RIOT_API_KEY = testCases[0][1];
  fetchFeaturedMatches(undefined, testCases[0][0] as ValueOfRegions);
  process.env.RIOT_API_KEY = testCases[1][1];
  fetchFeaturedMatches(undefined, testCases[1][0] as ValueOfRegions);
  process.env.RIOT_API_KEY = testCases[2][1];
  fetchFeaturedMatches(undefined, testCases[2][0] as ValueOfRegions);
});

test("test token in header", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[0][1]!.headers).toStrictEqual({ "X-Riot-Token": token1 });
  expect(calls[1][1]!.headers).toStrictEqual({ "X-Riot-Token": token2 });
});

test("test proper endpoint call", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[1][0]).toBe(url.resolve(region1, endpoints.FEATURED_MATCHES));
  expect(calls[2][0]).toBe(url.resolve(region2, endpoints.FEATURED_MATCHES));
});
