

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


export const apiSources = {
    v1: {
        base_url: `${transformEnvirotmentToDev('REACT_APP_BASE_URL')}/v1`,
        endpoints: {
            addition: "/addition",
            subtraction: "/subtraction",
            multiplication: "/multiplication",
            division: "/division",
            square_root: "/squareRoot",
            string_generator: "/stringGenerator",
            login: "/login",
            register: "/register",
        }
    },
}

