import { toast } from "react-toastify";
import { InternalResponseInterface, InternalResponsePaginatedInterface } from "../interface/internal.response.interface";
import { fetchUrl } from "./sources/api.caller"
import { apiSources } from "./sources/sources";
import { TOAST_OPTIONS } from "../toast.config/toast.config";
import { getToken } from "../jwt/jwt.helper";

export const userRecordGetAllService = async (limit: string = "5", lastEvaluatedKey?: string): Promise<InternalResponseInterface | InternalResponsePaginatedInterface | null> => {
    let queryParams = "";
    const sources = apiSources["v1"];
    const refrenceLimit = limit ? limit : "";
    const referenceLastEvalutaedKey = lastEvaluatedKey ? lastEvaluatedKey : ""
    queryParams = `?${new URLSearchParams({ limit: refrenceLimit, lastEvaluatedKey: referenceLastEvalutaedKey })}`
    const baseUrl = `${sources.base_url}${sources.endpoints.record.name}${queryParams}`
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
                toast.error('there is no more results', TOAST_OPTIONS);
                break;
            }
            case 401: {
                toast.error('unauthorized', TOAST_OPTIONS);
                window.location.href = "/authentication/login"
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


export const userRecordDeleteService = async (userRecordId: string): Promise<InternalResponseInterface | InternalResponsePaginatedInterface | null> => {
    const sources = apiSources["v1"];
    const baseUrl = `${sources.base_url}${sources.endpoints.recordDelete.name}`
    const authtenticationHeader = { "x-access-token": getToken() }
    const option = {
        method: sources.endpoints.recordDelete.method,
        headers: {
            "Content-Type": "application/json",
            ...authtenticationHeader
        },
        body: JSON.stringify({ userRecordId })
    }
    const result = await fetchUrl(baseUrl, option);
    if (result.error) {
        switch (result.status) {
            case 404: {
                toast.error('user record not found', TOAST_OPTIONS);
                break;
            }
            case 401: {
                toast.error('unauthorized', TOAST_OPTIONS);
                window.location.href = "/authentication/login"
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