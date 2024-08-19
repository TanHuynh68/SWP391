import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

interface UserData {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  doB: string;
  address: string;
}

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData: UserData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5105/Account/register', userData);
      return response.data;
    } catch (error: any) {
      // Xử lý lỗi và gửi về Redux state
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
