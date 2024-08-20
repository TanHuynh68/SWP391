import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5105';
const tokenWithBearer = localStorage.getItem('token');
const token = tokenWithBearer?.replace('Bearer ', '');
const user = localStorage.getItem('user');
const userData = user ? JSON.parse(user) : null;
const ownerId = userData?.Id;

// Async Thunk để lấy danh sách phòng khám
export const fetchClinics = createAsyncThunk(
    'manageDoctor/fetchClinics',
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

// Async Thunk để lấy danh sách bệnh nhân trong một phòng khám cụ thể
export const fetchPatients = createAsyncThunk(
    'manageDoctor/fetchPatients',
    async (clinicId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllPatientsOfClinic?clinicId=${clinicId}`, {
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

const manageDoctorSlice = createSlice({
    name: 'manageDoctor',
    initialState: {
        clinics: [],
        patients: [],
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
            .addCase(fetchPatients.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.patients = action.payload;
                state.loading = false;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default manageDoctorSlice.reducer;
