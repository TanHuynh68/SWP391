import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk để fetch dữ liệu Chuyên khoa
export const fetchSevicesAllServices = createAsyncThunk('registerClinic/fetchAllServices', async () => {
    const response = await axios.get('http://localhost:5105/Guest/GetAllServices');
    return response.data;
});

const servicesRegisterClinicSlice = createSlice({
    name: 'servicesRegisterClinic',
    initialState: {
        clinics: [],
        services: [],  // Thêm mảng services vào state
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSevicesAllServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSevicesAllServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;  // Lưu dữ liệu services vào state
            })
            .addCase(fetchSevicesAllServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default servicesRegisterClinicSlice.reducer;
