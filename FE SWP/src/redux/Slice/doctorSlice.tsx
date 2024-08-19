import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { doctorData } from '@data/doctorData';

// Thunk để gọi API và xử lý dữ liệu
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async () => {
    const response = await axios.get('http://localhost:5105/Guest/GetAllDoctors');
    return response.data.map((doctor: any, index: number) => ({
      ...doctor,
      image: doctor.account.image || doctorData[index]?.imageUrl || 'default_image_url', 
    }));
  }
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;
