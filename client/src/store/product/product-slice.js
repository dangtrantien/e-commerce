import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const productSlice = createSlice({
  name: 'product',
  initialState: {
    total: 0,
    items: [],
  },
  reducers: {
    replaceProductSate(state, action) {
      state.total = action.payload.total;
      state.items = action.payload.result;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
