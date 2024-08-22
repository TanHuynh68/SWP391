import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5105';

// Async Thunk để gọi API đăng ký phòng khám
export const registerClinic = createAsyncThunk(
    'registerClinic/registerClinic',
    async (clinicData: { clinicName: string, description: string, address: string, serviceIdList: number[], ownerId: number }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${BASE_URL}/ClinicOwner/addClinic`, clinicData, {
          headers: {
            Authorization: `Bearer ${clinicData.token}`,
          }
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
);

// Async Thunk để gọi API lấy danh sách phòng khám
export const fetchAllClinics = createAsyncThunk(
    'registerClinic/fetchAllClinics',
    async ({ ownerId, token }: { ownerId: number, token: string }, { rejectWithValue }) => {
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

const registerClinicSlice = createSlice({
  name: 'registerClinic',
  initialState: {
    clinics: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerClinic.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerClinic.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerClinic.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchAllClinics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClinics.fulfilled, (state, action) => {
        state.clinics = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllClinics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerClinicSlice.reducer;
