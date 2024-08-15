import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Service {
  id: number;
  status: number;
  name: string;
}

interface ServicesState {
  services: Service[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch services from the API
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await axios.get<Service[]>('https://localhost:7012/Guest/GetAllServices');
  return response.data;
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export default servicesSlice.reducer;
