import { combineReducers } from 'redux'
import AuthReducer from './AuthReducers'
import navbarReducer from './NavbarReducers'

const rootReducer = combineReducers({
    auth: AuthReducer, 
    nav: navbarReducer
})

export default rootReducer