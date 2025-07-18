import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortOption: {
    name: "popular",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryValue: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortOption = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sortOption = action.payload.sortOption;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryValue, setSortValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
