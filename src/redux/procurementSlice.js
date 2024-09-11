import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance"

const initialState = {
    procurements: [],
    procure: null,
    warehouseData: [],
    status: 'idle',
    error: null,
}

export const fetchProcurements = createAsyncThunk(
    'procurement/fetchProcurements',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/vendor-product?size=150")
            console.log('Procurements fetched:', response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const transactionProcurements = createAsyncThunk(
    'procurement/transactionProcurements',
    async ({ transactionDetail }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/transactions", { transactionDetail });
            console.log(response.data)
            return response.data; // Return the full response object
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const procurementSlice = createSlice({
    name: "procurements",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProcurements.pending, (state) => {
                state.status = 'loading..'
            })
            .addCase(fetchProcurements.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.procurements = action.payload
            })
            .addCase(fetchProcurements.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
                state.error = action.payload || action.error.message;
            })
            .addCase(transactionProcurements.pending, (state) => {
                state.status = 'loading..'
            })
            .addCase(transactionProcurements.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.warehouseData = action.payload
            })
            .addCase(transactionProcurements.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export default procurementSlice.reducer;