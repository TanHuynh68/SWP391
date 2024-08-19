import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import img1 from "@assets/fetch-data/services/image1.png";
import img2 from "@assets/fetch-data/services/image2.png";
import img3 from "@assets/fetch-data/services/image3.png";
import img4 from "@assets/fetch-data/services/image4.png";
import img5 from "@assets/fetch-data/services/image5.png";
import img6 from "@assets/fetch-data/services/image6.png";
import img8 from "@assets/fetch-data/services/image8.png";

// Định nghĩa các icon cho các dịch vụ
const serviceIcons: { [key: string]: string } = {
  "Tổng quát": img6,
  "Niềng răng": img2,
  "Bọc răng sứ": img3,
  "Trồng răng implant": img4,
  "Nhổ răng khôn": img5,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const response = await axios.get('http://localhost:5105/Guest/GetAllServices');
    return response.data.map((service: any) => ({
      ...service,
      icon: serviceIcons[service.name] || 'default_image_url', // Sử dụng icon từ frontend
      status: service.status === 2 ? 'active' : 'deactive', // Xác định trạng thái active/deactive
    }));
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    status: 'idle',
    error: null,
  },
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
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
