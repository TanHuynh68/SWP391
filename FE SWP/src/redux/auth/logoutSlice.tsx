import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedOut: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedOut = true;
      localStorage.removeItem('token'); // Xóa token khỏi Local Storage
      localStorage.removeItem('user');  // Xóa thông tin người dùng khỏi Local Storage
    },
  },
});

export const { logout } = logoutSlice.actions;

export default logoutSlice.reducer;
