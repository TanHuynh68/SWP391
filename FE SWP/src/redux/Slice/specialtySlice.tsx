import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { specialtyData } from '@data/specialtyData';

// Thunk để gọi API và xử lý dữ liệu
export const fetchSpecialties = createAsyncThunk(
  'specialty/fetchSpecialties',
  async () => {
    const response = await axios.get('http://localhost:5105/Guest/GetAllClinics');
    return response.data.map((clinic: any, index: number) => ({
      ...clinic,
      image: clinic.image || specialtyData[index]?.imageUrl || 'default_image_url', // Sử dụng dữ liệu từ frontend nếu image null
    }));
  }
);

const specialtySlice = createSlice({
  name: 'specialty',
  initialState: {
    specialties: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default specialtySlice.reducer;
