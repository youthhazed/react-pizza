import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cards: [],
  status: 'loading', // loading | success | error
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { categoryId, sortType } = params;
  const { data } = await axios.get(
    `https://8cf9c36e94f750a8.mokky.dev/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType}`,
  );
  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.cards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.cards = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.cards = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
