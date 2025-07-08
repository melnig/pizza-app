import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params) => {
    const { currentPage, category, sort, search } = params;
    const { data } = await axios.get(
      `https://685a49519f6ef9611155b072.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}${search}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  isLoading: false,
  status: "",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.status = "success";
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.isLoading = false;
      state.items = [];
      state.status = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
