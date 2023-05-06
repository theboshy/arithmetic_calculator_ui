import { APP_BASE_URL_DEV } from "../../../env";

/**
 * @deprecated
 * @param environmentName 
 * @returns 
 */
const transformEnvirotmentToDev = (environmentName: string | undefined): string | undefined => {
    let transformedEnvirotmentName: string | undefined = environmentName;
    let defaultEnvVariable = process.env[environmentName!]
    try {
        if (process.env.NODE_ENV !== 'production') {
            if (environmentName && !environmentName.includes("DEV")) {
                transformedEnvirotmentName = `${environmentName}_DEV`
                return process.env[transformedEnvirotmentName];
            }
        }
    } catch (error) {

    }
    return defaultEnvVariable;
}

type Endpoints = {
    [key: string]: {
        name: string,
        method: string
    }
}

type Versions = {
    [key: string]: {
        base_url: string,
        endpoints: Endpoints
    }
}


export const findEndpoint = (name: string, version: string): any | undefined => {
    const versionObj = apiSources[version];
    if (versionObj) {
        const endpoints = versionObj.endpoints;
        for (const key in endpoints) {
            if (key === name) {
                return endpoints[key].name;
            }
        }
    }
    return undefined;
}

export const apiSources: Versions = {
    v1: {
        base_url: `${APP_BASE_URL_DEV}/v1`,
        endpoints: {
            addition: {
                name: "/addition",
                method: "GET"
            },
            subtraction: {
                name: "/subtraction",
                method: "GET"
            },
            multiplication: {
                name: "/multiplication",
                method: "GET"
            },
            division: {
                name: "/division",
                method: "GET"
            },
            squareRoot: {
                name: "/squareRoot",
                method: "GET"
            },
            stringGenerator: {
                name: "/stringGenerator",
                method: "GET"
            },
            login: {
                name: "/login",
                method: "POST"
            },
            //register: "/register",
            operation: {
                name: "/operation",
                method: "GET"
            },
            record: {
                name: "/userRecord",
                method: "GET"
            },
            recordDelete: {
                name: "/userRecord",
                method: "PUT"
            }
        }
    },
}

export const operationEntryValues: Record<string, any> = {
    addition: [
        { name: "First Number", variable: "numberA" }, { name: "Second Number", variable: "numberB" }
    ],
    division: [
        { name: "First Number", variable: "numberA" }, { name: "Second Number", variable: "numberB" }
    ],
    subtraction: [
        { name: "First Number", variable: "numberA" }, { name: "Second Number", variable: "numberB" }
    ],
    multiplication: [
        { name: "First Number", variable: "numberA" }, { name: "Second Number", variable: "numberB" }
    ],
    squareRoot: [
        { name: "First Number", variable: "numberA" }
    ]
}
