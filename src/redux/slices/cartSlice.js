import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((summ, obj) => {
        return obj.price + summ;
      }, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
