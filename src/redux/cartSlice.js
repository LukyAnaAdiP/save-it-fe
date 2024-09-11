import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // itemCount: 0,
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log("Adding product to cart:", action.payload);
      const itemInCart = state.cart.find((item) => item.vendorProductId === action.payload.vendorProductId);

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      console.log("Cart after addition:", state.cart);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.vendorProductId === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.vendorProductId === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cart = state.cart.filter((item) => item.vendorProductId !== action.payload);
        }
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.vendorProductId !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
