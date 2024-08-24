import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:5105';


interface ClinicManagementState {
  clinics: any[];
  doctors: any[];
  workingTimes: any[];
  userData: { Id: number } | null;
  loading: boolean;
  error: any;
}

const initialState: ClinicManagementState = {
  clinics: [],
  doctors: [],
  workingTimes: [],
  userData: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};

// Async thunk to fetch clinics by owner ID
export const fetchClinicsByOwnerId = createAsyncThunk(
  'clinicManagement/fetchClinicsByOwnerId',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { clinicManagement: ClinicManagementState };
      const ownerId = state.clinicManagement.userData?.Id;

      const tokenWithBearer = localStorage.getItem('token');
      const token = tokenWithBearer?.replace('Bearer ', '');

      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllClinicsByOwnerId?ownerId=${ownerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'text/plain',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch doctors by clinic ID
export const fetchDoctorsByClinicId = createAsyncThunk(
  'clinicManagement/fetchDoctorsByClinicId',
  async (clinicId: number, { rejectWithValue }) => {
    try {
      const tokenWithBearer = localStorage.getItem('token');
      const token = tokenWithBearer?.replace('Bearer ', '');

      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllDoctorsOfClinic?clinicId=${clinicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'text/plain',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch working times by doctor ID
export const fetchWorkingTimesByDoctorId = createAsyncThunk(
  'clinicManagement/fetchWorkingTimesByDoctorId',
  async (doctorId: number, { rejectWithValue }) => {
    try {
      const tokenWithBearer = localStorage.getItem('token');
      const token = tokenWithBearer?.replace('Bearer ', '');

      const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllWorkingTimeOfDoctor?doctorId=${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'text/plain',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateWorkingTimeForDoctor = createAsyncThunk(
    'clinicManagement/updateWorkingTimeForDoctor',
    async (workingTimeData: { doctorId: number; workingDayOfWeek: number; slotId: number[] }, { rejectWithValue }) => {
      try {
        const tokenWithBearer = localStorage.getItem('token');
        const token = tokenWithBearer?.replace('Bearer ', '');
  
        const response = await axios.post('http://localhost:5105/ClinicOwner/UpdateWorkingTimeForDoctor', workingTimeData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json-patch+json',
          },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const clinicManagementSlice = createSlice({
  name: 'clinicManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle clinics fetch
    builder.addCase(fetchClinicsByOwnerId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchClinicsByOwnerId.fulfilled, (state, action) => {
      state.loading = false;
      state.clinics = action.payload;
    });
    builder.addCase(fetchClinicsByOwnerId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle doctors fetch
    builder.addCase(fetchDoctorsByClinicId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDoctorsByClinicId.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
    });
    builder.addCase(fetchDoctorsByClinicId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle working times fetch
    builder.addCase(fetchWorkingTimesByDoctorId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWorkingTimesByDoctorId.fulfilled, (state, action) => {
      state.loading = false;
      state.workingTimes = action.payload;
    });
    builder.addCase(fetchWorkingTimesByDoctorId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateWorkingTimeForDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(updateWorkingTimeForDoctor.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful update if needed
      });
      builder.addCase(updateWorkingTimeForDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clinicManagementSlice.reducer;
