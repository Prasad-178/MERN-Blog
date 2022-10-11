import { CHANGE_SELECTED_NAVBAR } from "./NavbarType"

export const changeSelected = (val: Number) => {
    return {
        type: CHANGE_SELECTED_NAVBAR,
        payload: val
    }
}