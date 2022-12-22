import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

interface userData {
    name?: string
    email?: string
    password?: string
    verified?: boolean
}

interface state {
    loading: boolean
    data: userData
    status: "idle" | "succeeded" | "failed"
    method: "idle" | "login" | "logout"
    error: any
}

const initialState: state = {
    loading: false,
    data: {},
    method: "idle",
    status: "idle",
    error: null
}

axios.defaults.withCredentials =  true
const BASE_URL = "http://localhost:5000/api/"
const api = BASE_URL + "secure/login"

interface userCredentials {
    email: string
    password: string
}

export const fetchUser = createAsyncThunk("fetch/fetchUser", async (credentials: userCredentials, { rejectWithValue }) => {
    console.log("done!! triggered!!")
    try {
        const response = await axios.post(api, credentials, { withCredentials: true })
        console.log("after trigger : ")
        return response.data
    } catch (err: any) {
        return rejectWithValue(err)
    }
})

const apiOut = BASE_URL + "secure/logout"

export const fetchOutUser = createAsyncThunk("fetch/fetchOutUser", async (Params: any, { rejectWithValue }) => {
    try {
        const response = await axios.get(apiOut, { withCredentials: true })
        return response.data
    } catch (err: any) {
        return rejectWithValue("You are not logged in!")
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction <string>) => {
            state.data.name = action.payload
        },
        setEmail: (state, action: PayloadAction <string>) => {
            state.data.email = action.payload
        },
        setVerified: (state, action: PayloadAction <boolean>) => {
            state.data.verified = action.payload
        },
        setStatus: (state, action: PayloadAction <"idle" | "failed" | "succeeded">) => {
            state.status = "idle"
        },
        setMethod: (state, action: PayloadAction<"idle" | "failed" | "succeeded">) => {
            state.method = "idle"
        },
        setData: (state, action: PayloadAction <userData>) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true
                state.status = "idle"
                state.method = "login"
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = "succeeded"
                state.method = "login"
                state.data = action.payload
                state.error = "Logged in successfully!"
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.status = "failed"
                state.method = "login"
                state.data = {}
                state.error = "Your credentials do not match any credentials in our system!"
            })
            .addCase(fetchOutUser.pending, (state, action) => {
                state.loading = true
                state.status = "idle"
                state.method = "logout"
            })
            .addCase(fetchOutUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = "succeeded"
                state.method = "logout"
                state.data = action.payload
                state.error = "Logged out successfully!"
            })
            .addCase(fetchOutUser.rejected, (state, action) => {
                state.loading = false
                state.status = "failed"
                state.method = "logout"
                state.data = {}
                state.error = "Logout failed!"
            })
    }
})

export default userSlice.reducer
export const { setName, setEmail, setVerified, setStatus, setMethod, setData } = userSlice.actions