import { CHANGE_SELECTED_NAVBAR } from "../actions/NavbarType"

const initialState = {
    Selected: -1
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
