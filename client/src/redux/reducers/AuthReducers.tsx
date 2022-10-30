import { AUTH_CHECK } from "../types/AuthType";
import AuthCheck from "../../assets/auth-asset/AuthCheck";

const initialState = {
    Auth: AuthCheck() ? true : false
    // intially not authorized
}

const AuthReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case AUTH_CHECK:
            return {
                ...state,
                Auth: !(state.Auth)
            }

            default: return state
    }
}

export default AuthReducer
