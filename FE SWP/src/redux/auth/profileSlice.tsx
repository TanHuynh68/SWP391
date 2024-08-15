import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const PRF_API_URL = import.meta.env.VITE_API_URL;
interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  accountRole: 'ADMIN' | 'GUEST' | 'CUSTOMER';  
  avatar: string;
}

interface ProfileState {
  user: UserProfile ;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PRF_API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default profileSlice.reducer;
