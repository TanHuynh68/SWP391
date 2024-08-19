import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5105';
const tokenWithBearer = localStorage.getItem('token');
const token = tokenWithBearer?.replace('Bearer ', '');
const user = localStorage.getItem('user');
const userData = user ? JSON.parse(user) : null;
const ownerId = userData?.Id;

// Async Thunks để gọi API
export const fetchClinics = createAsyncThunk(
  'clinicManagement/fetchClinics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllClinicsByOwnerId?ownerId=${ownerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  'clinicManagement/fetchDoctors',
  async (clinicId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllDoctorsOfClinic?clinicId=${clinicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchWorkingTimes = createAsyncThunk(
  'clinicManagement/fetchWorkingTimes',
  async (doctorId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllWorkingTimeOfDoctor?doctorId=${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const clinicManagementSlice = createSlice({
  name: 'clinicManagement',
  initialState: {
    clinics: [], 
    doctors: [],
    workingTimes: [],
    selectedDoctorId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDoctorId: (state, action) => {
      state.selectedDoctorId = action.payload;
    },
  },
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

export const { setSelectedDoctorId } = clinicManagementSlice.actions;
export default clinicManagementSlice.reducer;
