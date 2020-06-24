import { fetchMatchAndTimeline } from "../../fetchers/fetchMatchAndTimeline";
import axios from "axios"
import { mocked } from "ts-jest/utils";
import url from "url"
import { endpoints } from "../../constants";

jest.mock("axios")


test("test call for both match and timeline", ()=>{
  process.env.RIOT_API_KEY = "TEST"
  const testRegion = "https://br1.api.riotgames.com";
  const testID = 123;

  mocked(axios.get).mockResolvedValue(1)

  fetchMatchAndTimeline(testID, testRegion)

  let calls = mocked(axios.get).mock.calls

  expect(calls[0]).toEqual([
    url.resolve(testRegion, endpoints.MATCHES) + testID,
    {headers: {"X-Riot-Token": "TEST"}}
  ])
  expect(calls[1]).toEqual([
    url.resolve(testRegion, endpoints.TIMELINE) + testID,
    {headers: {"X-Riot-Token": "TEST"}}
  ])

})