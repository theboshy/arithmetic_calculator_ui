import { toast } from "react-toastify";
import { InternalResponseInterface } from "../interface/internal.response.interface";
import { fetchUrl } from "./sources/api.caller"
import { apiSources } from "./sources/sources";
import { TOAST_OPTIONS } from "../toast.config/toast.config";

export const loginService = async (username: string, password: string): Promise<InternalResponseInterface | null> => {
    const sources = apiSources["v1"];
    const baseUrl = `${sources.base_url}${sources.endpoints.login.name}`
    const option = {
        method: sources.endpoints.login.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
    }
    const result = await fetchUrl(baseUrl, option);
    if (result.error) {
        switch (result.status) {
            case 404: {
                toast.error('username not found', TOAST_OPTIONS);
                break;
            }
            case 401: {
                toast.error('password is incorrect', TOAST_OPTIONS);
                break;
            }
        }
        return null;
    } else {
        return result;
    }
}