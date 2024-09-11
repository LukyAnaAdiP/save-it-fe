import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

const initialState = {
    customers: [],
    status: "idle",
    error: null,
};

export const fetchCustomers = createAsyncThunk(
    "customers/fetchCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/customers/all");
            console.log("API Response:", response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const customerListSlice = createSlice(
    {
        name: "customers",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchCustomers.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(fetchCustomers.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.customers = action.payload;
                })
                .addCase(fetchCustomers.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                })
        },
    }
)

export default customerListSlice.reducer