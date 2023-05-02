import { toast } from "react-toastify";
import { InternalResponseInterface } from "../interface/internal.response";
import { fetchUrl } from "./sources/api.caller"
import { apiSources } from "./sources/sources";
import { TOAST_OPTIONS } from "../toast.config/toast.config";
import { getToken } from "../jwt/jwt.helper";

export const stringGeneratorService = async (variables: any): Promise<InternalResponseInterface | null> => {
    const sources = apiSources["v1"];
    const baseUrl = `${sources.base_url}${sources.endpoints.stringGenerator.name}`
    const authtenticationHeader = { "x-access-token": getToken() }
    const option = {
        method: sources.endpoints.operation.method,
        headers: {
            "Content-Type": "application/json",
            ...authtenticationHeader
        },
    }
    const result = await fetchUrl(baseUrl, option);
    if (result.error) {
        switch (result.status) {
            case 400: {
                toast.error('invalid data', TOAST_OPTIONS);
                break;
            }
            case 402: {
                toast.error('Insufficient funds', TOAST_OPTIONS);
                break;
            }
            default: {
                toast.error('internal error occurred', TOAST_OPTIONS);
                window.location.href = "/authentication/login"
                break;
            }
        }
        return null;
    } else {
        return result;
    }
}