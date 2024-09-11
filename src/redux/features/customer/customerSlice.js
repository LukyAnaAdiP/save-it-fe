import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    warehouseProducts: [],
    categories: [],
    transactionHistory: [],
    status: "idle",
    error: null,
};

export const fetchCategories = createAsyncThunk(
    "customer/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/goods-category?size=150");
            console.log("API Response:", response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchWarehouseProducts = createAsyncThunk(
    "customer/fetchWarehouseProducts",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching warehouse products...");
            const response = await axiosInstance.get("/warehouses/customer?size=150");
            console.log("Data:", response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchTransactionHistory = createAsyncThunk(
    "customer/fetchTransactionHistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/reports/customer");
            console.log("API Response:", response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addProducts = createAsyncThunk(
    "customer/addProducts",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/customer-goods", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateProduct = createAsyncThunk(
    "customer/updateProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/warehouses`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWarehouseProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWarehouseProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.warehouseProducts = action.payload;
            })
            .addCase(fetchWarehouseProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchTransactionHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.transactionHistory = action.payload;
            })
            .addCase(fetchTransactionHistory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.warehouseProducts = [...state.warehouseProducts];
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.warehouseProducts.findIndex(product => product.warehouseId === action.payload.warehouseId);
                if (index !== -1) {
                    state.warehouseProducts[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    },
});

export default customerSlice.reducer;
