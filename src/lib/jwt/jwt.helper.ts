const USER_TOKEN_REFERENCE = "__auth___token____";

export const getToken = (): string | null => {
    try {
        return sessionStorage.getItem(USER_TOKEN_REFERENCE);
    } catch (error) {
        return null;
    }
}

export const setToken = (token: string): boolean | null => {
    try {
        sessionStorage.setItem(USER_TOKEN_REFERENCE, token);
        return true;
    } catch (error) {
        return false;
    }
}