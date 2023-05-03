import { toast } from "react-toastify";
import { InternalResponseInterface, InternalResponsePaginatedInterface } from "../interface/internal.response.interface";
import { fetchUrl } from "./sources/api.caller"
import { apiSources } from "./sources/sources";
import { TOAST_OPTIONS } from "../toast.config/toast.config";
import { getToken } from "../jwt/jwt.helper";

export const operationGetAllService = async (limit?: string, lastEvaluatedKey?: string): Promise<InternalResponseInterface | InternalResponsePaginatedInterface | null> => {
    let queryParams = "";
    const sources = apiSources["v1"];
    if (limit && lastEvaluatedKey) {
        queryParams = `?${new URLSearchParams({ limit, lastEvaluatedKey })}`
    }
    const baseUrl = `${sources.base_url}${sources.endpoints.operation.name}${queryParams}`
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
            case 404: {
                toast.error('operations is void', TOAST_OPTIONS);
                break;
            }
            default: {
                toast.error('internal error occurred', TOAST_OPTIONS);
                break;
            }
        }
        return null;
    } else {
        return result;
    }
}