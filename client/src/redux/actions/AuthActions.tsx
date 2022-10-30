import { AUTH_CHECK } from "../types/AuthType";

export const changeAuth = (val: boolean) => {
    return {
        type: AUTH_CHECK,
        payload: val
    }
}