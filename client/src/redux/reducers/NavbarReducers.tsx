import { CHANGE_SELECTED_NAVBAR } from "../types/NavbarType"

const initialState = {
    Selected: null
    //numOfCakes
}

const navbarReducer = (state = initialState, action:any) => {
    switch(action.type) {
        case CHANGE_SELECTED_NAVBAR:
            return {
                ...state,
                Selected: action.payload
            }
        default: return state
    }
}

export default navbarReducer
