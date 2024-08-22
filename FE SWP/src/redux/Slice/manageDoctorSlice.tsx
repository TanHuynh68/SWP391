
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5105';

// Async Thunk để lấy danh sách phòng khám (bao gồm cả phòng khám đang hoạt động và không hoạt động)
export const fetchAllClinicsActiveAndDeactiveByOwnerId = createAsyncThunk(
    'manageDoctor/fetchAllClinicsActiveAndDeactiveByOwnerId',
    async ({ ownerId, token }: { ownerId: number, token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/ClinicOwner/GetAllClinicsActiveAndDeactiveByOwnerId?ownerId=${ownerId}`, {
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

// Async Thunk để lấy danh sách phòng khám theo ownerId
export const fetchClinics = createAsyncThunk(
    'manageDoctor/fetchClinics',
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

// Async Thunk để lấy danh sách bác sĩ trong một phòng khám cụ thể
export const fetchDoctors = createAsyncThunk(
    'manageDoctor/fetchDoctors',
    async ({ clinicId, token }: { clinicId: number, token: string }, { rejectWithValue }) => {
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

// Async Thunk để thêm mới bác sĩ
export const addDoctor = createAsyncThunk(
    'manageDoctor/addDoctor',
    async ({ token, clinicId, ...newDoctor }: { token: string, clinicId: number, newDoctor: any }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/ClinicOwner/addDoctor?clinicId=${clinicId}`, newDoctor, {
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
        doctors: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllClinicsActiveAndDeactiveByOwnerId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllClinicsActiveAndDeactiveByOwnerId.fulfilled, (state, action) => {
                state.clinics = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllClinicsActiveAndDeactiveByOwnerId.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
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
                state.doctors = Array.isArray(action.payload) ? action.payload : [];
                state.loading = false;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addDoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors.push(action.payload);
            })
            .addCase(addDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default manageDoctorSlice.reducer;