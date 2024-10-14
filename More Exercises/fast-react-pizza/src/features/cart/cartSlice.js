import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const getItem = (array, id) => array.find((item) => item.id == id);

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id != action.payload);
    },
    incrementQuantityInCart(state, action) {
      const item = getItem(state.cart, action.payload);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decrementQuantityInCart(state, action) {
      const item = getItem(state.cart, action.payload);

      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity < 1) {
        slice.caseReducers.removeFromCart(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default slice.reducer;
export const {
  addToCart,
  removeFromCart,
  incrementQuantityInCart,
  decrementQuantityInCart,
  clearCart,
} = slice.actions;

export const getCart = (store) => store.cart.cart;

export const getTotalQuantity = (store) =>
  store.cart.cart.reduce((totalQuantity, eachItem) => {
    return totalQuantity + eachItem.quantity;
  }, 0);

export const getCartPrice = (store) =>
  store.cart.cart.reduce((price, eachItem) => {
    return price + eachItem.totalPrice;
  }, 0);

export const getItemQuantity = (id) => (store) => {
  return getItem(store.cart.cart, id)?.quantity || 0;
};
