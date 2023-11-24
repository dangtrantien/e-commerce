import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const InitialProductState = {
  name: '',
  category: '',
  img1: '',
  img2: '',
  img3: '',
  img4: '',
  price: 0,
  long_desc: '',
  short_desc: '',
  count: 0,
  totalSaled: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState: InitialProductState,
  reducers: {
    replaceProductSate(state, action) {
      Object.keys(state).map((key) => {
        if (action.payload.name === key) {
          state[key] = action.payload.value;
        }

        return null;
      });
    },
    addNewProduct(state) {
      Object.keys(state).map((key) => (state[key] = InitialProductState[key]));
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
