import { legacy_createStore as createStore } from "redux"
import navbarReducer from "../reducers/NavbarReducers"

const store = createStore(navbarReducer)

export default store