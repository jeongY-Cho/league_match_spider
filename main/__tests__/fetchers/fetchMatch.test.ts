import axios from "axios";
import { mocked } from "ts-jest/utils";
import { fetchMatch } from "../../fetchers/fetchMatch";
import { ValueOfRegions } from "../..";
import { endpoints } from "../../constants";
import url from "url";

jest.mock("axios");

let match1 = 123;
let match2 = 456;

let region1 = "https://region1.test.com";
let region2 = "https://region2.test.com";

let token1 = "TEST";
let token2 = "TEST2";

let testCases = [
  [match1, region1, token1],
  [match2, region1, token2],
  [match2, region2, token2],
];

beforeAll(() => {
  mocked(axios.get).mockResolvedValue(true);

  process.env.RIOT_API_KEY = testCases[0][2] as string
  fetchMatch(testCases[0][0] as number, testCases[0][1] as ValueOfRegions);
  process.env.RIOT_API_KEY = testCases[1][2] as string
  fetchMatch(testCases[1][0] as number, testCases[1][1] as ValueOfRegions);
  process.env.RIOT_API_KEY = testCases[2][2] as string
  fetchMatch(testCases[2][0] as number, testCases[2][1] as ValueOfRegions);
});

test("test token in header", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[0][1]!.headers).toStrictEqual({ "X-Riot-Token": token1 });
  expect(calls[1][1]!.headers).toStrictEqual({ "X-Riot-Token": token2 });
});

test("test proper endpoint call", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[1][0]).toBe(url.resolve(region1, endpoints.MATCHES) + match2);
  expect(calls[2][0]).toBe(url.resolve(region2, endpoints.MATCHES) + match2);
});
test("test proper id append", () => {
  let calls = mocked(axios.get).mock.calls;

  expect(calls[0][0]).toBe(url.resolve(region1, endpoints.MATCHES) + match1);
  expect(calls[1][0]).toBe(url.resolve(region1, endpoints.MATCHES) + match2);
});
