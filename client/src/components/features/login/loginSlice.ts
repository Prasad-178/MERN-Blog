import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../user/userSlice";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";

interface state {
    loading: boolean
    login: boolean
    status : "idle" | "succeeded" | "failed"
    method: "fetchUser" | "idle"
    error: any
}

const initialState: state = {
    loading: false,
    login: false,
    status: "idle",
    method: "idle",
    error: null
}

axios.defaults.withCredentials = true
const BASE_URL = "http://localhost:5000/api/"
const checkLoginApi = BASE_URL + "secure/get"

export const checkLogin = createAsyncThunk("check/checkLogin", async (params: any, { rejectWithValue }) => {
    console.log("check login!!")
    try {
        const response = await axios.get(checkLoginApi)
        return response.data
    } catch (err: any) {
        return rejectWithValue("You are not logged in!")
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction <boolean>) => {
            state.login = action.payload
        },
        setStatus: (state, action: PayloadAction <"idle" | "failed" | "succeeded">) => {
            state.status = action.payload
        },
        setMethod: (state, action: PayloadAction <"idle" | "fetchUser">) => {
            state.method = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkLogin.pending, (state, action) => {
                state.loading = true
                state.status = "idle"
                state.method = "fetchUser"
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.loading = false
                state.status = "succeeded"
                state.method ="idle"
                state.error = ''
                state.login = true
            })
            .addCase(checkLogin.rejected, (state, action) => {
                state.loading = false
                state.status = "failed"
                state.method = "idle"
                state.error = "You are not logged in!"
                state.login = false
            })
    }
})

export default loginSlice.reducer
export const { setLogin, setMethod, setStatus }  = loginSlice.actions