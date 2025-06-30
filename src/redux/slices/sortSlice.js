import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "popular",
  sortProperty: "rating",
};

export const sortSlice = createSlice({
  name: "sorts",
  initialState,
  reducers: {
    setSortValue: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.sortProperty = action.payload.sortProperty;
    },
  },
});

export const { setSortValue } = sortSlice.actions;

export default sortSlice.reducer;
