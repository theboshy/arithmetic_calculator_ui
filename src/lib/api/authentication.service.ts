import { InternalResponseInterface } from "../interface/internal.response";
import { fetchUrl } from "./api.caller"
import { apiSources } from "./sources/sources";

export const loginService = async (username: string, password: string): Promise<InternalResponseInterface> => {
    const sources = apiSources["v1"];
    const baseUrl = `${sources.base_url}${sources.endpoints.login}`
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
    }
    const result = await fetchUrl(baseUrl, option);
    return result;
}