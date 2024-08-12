import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

// Define the async thunk for login
export const login = createAsyncThunk<string, { email: string; password: string }>(
  'auth/login',
  async ({ email, password }) => {
    const response = await axios.post('http://localhost:5105/Account/login', {
      email,
      password,
    });
    console.log('API call response:', response.data); 
    return response.data.token;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log('Login API call pending...'); 
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login API call succeeded:', action.payload);  
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('Login API call failed:', action.error.message); 
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
