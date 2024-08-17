import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5105';

// Async Thunks để gọi API
export const fetchClinics = createAsyncThunk(
  'clinicManagement/fetchClinics',
  async (ownerId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ local storage
      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllClinicsByOwnerId?ownerId=${ownerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  'clinicManagement/fetchDoctors',
  async (clinicId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ local storage
      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllDoctorsOfClinic?clinicId=${clinicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWorkingTimes = createAsyncThunk(
  'clinicManagement/fetchWorkingTimes',
  async (doctorId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ local storage
      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllWorkingTimeOfDoctor?doctorId=${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const clinicManagementSlice = createSlice({
  name: 'clinicManagement',
  initialState: {
    clinics: [],
    doctors: [],
    workingTimes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.clinics = action.payload;
        state.loading = false;
      })
      .addCase(fetchClinics.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchWorkingTimes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkingTimes.fulfilled, (state, action) => {
        state.workingTimes = action.payload;
        state.loading = false;
      })
      .addCase(fetchWorkingTimes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default clinicManagementSlice.reducer;
