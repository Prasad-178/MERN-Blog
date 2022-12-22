import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from '../features/user/userSlice';
import loginReducer from '../features/login/loginSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({serializableCheck: false}).concat(logger),
})

export default store
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch