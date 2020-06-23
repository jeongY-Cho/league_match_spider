import { fetchWrapper } from "./fetchWrapper";
import { ValueOfRegions } from "..";
import url from "url"
import Axios from "axios";
import { AccountInfo } from "../types"

function _fetchAccountInfo(id: string, REGION: ValueOfRegions): Promise<AccountInfo> {
    let endpoint = url.resolve(REGION, "/lol/summoner/v4/summoners/by-name/" + id)
    return Axios.get(endpoint, {
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY
        }
    })
}


export const fetchAccountInfo = fetchWrapper(_fetchAccountInfo)