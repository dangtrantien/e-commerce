import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/user-slice';
import productReducer from './product/product-slice';

// ==================================================

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

// export const host = 'http://localhost:5000';
export const host = 'https://e-commerce-server-dangtrantien.vercel.app';

export default store;
