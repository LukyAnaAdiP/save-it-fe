import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

export const fetchVendors = createAsyncThunk(
  "vendors/fetchVendors",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get("/vendors?size=50");
      // console.log(response.data.data);
      return response.data.data;
    } catch (e) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const fetchVendorsAndProducts = createAsyncThunk(
  "vendors/fetchVendorsAndProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vendor-product/product?size=250");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVendor = createAsyncThunk(
  "vendors/addVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/vendors", vendorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "vendors/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      // const formData = new FormData();
      // for (const key in productData) {
      //   formData.append(key, productData[key]);
      // }
      
      const response = await axiosInstance.post("/products/product-list", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendors: [],
    vendorsAndProducts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVendorsAndProducts.fulfilled, (state, action) => {
        state.vendorsAndProducts = action.payload;
      })
      .addCase(addVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendors.push(action.payload);
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Find the correct vendor and add the new product
        const vendor = state.vendorsAndProducts.find(v => v.vendorDetails.vendorId === action.payload.vendorId);
        if (vendor) {
          vendor.products.push(action.payload);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default vendorSlice.reducer;
