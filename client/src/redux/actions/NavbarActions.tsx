import { CHANGE_SELECTED_NAVBAR } from "../types/NavbarType"

export const changeSelected = (val: Number) => {
    return {
        type: CHANGE_SELECTED_NAVBAR,
        payload: val
    }
}