import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.cartItems[index].quantity += 1;
        toast.info(`${action.payload.name} added again`, {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        });
      } else {
        const prod = { ...action.payload, quantity: 1 };
        state.cartItems.push(prod);
        toast.info(`${action.payload.name} added`, {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 1000,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // removeItem(state, action){

    // }
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
