import { createSlice } from '@reduxjs/toolkit';

// ==================================================

const InitialUserSate = {
  _id: '',
  fullName: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  role: '',
  cart: {
    items: [],
    totalItem: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: InitialUserSate,
  reducers: {
    replaceUserState(state, action) {
      Object.keys(state).map((key) => {
        if (action.payload.name === key) {
          state[key] = action.payload.value;
        }

        return null;
      });
    },
    logout(state) {
      Object.keys(state).map((key) => {
        state[key] = InitialUserSate[key];

        return null;
      });
    },
    // Xóa cart sau khi user order
    clearCart(state) {
      state.cart = InitialUserSate.cart;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
