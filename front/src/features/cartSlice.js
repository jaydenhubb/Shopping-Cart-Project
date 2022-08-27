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
    remoove(state, action) {
      const rem = state.cartItems.filter(
        (item) => item.id !== action.payload.id,
      );
      state.cartItems = rem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increment(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.cartItems[index].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrement(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
      } else if (state.cartItems[index].quantity === 1) {
        const rem = state.cartItems.filter(
          (item) => item.id !== state.cartItems[index].id,
        );
        state.cartItems = rem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal(state) {
      let quantity = 0;
      let totalPrice = 0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        totalPrice += item.quantity * item.price;
      });
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = totalPrice
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, remoove, increment, decrement, clearCart, getTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
