// import { configureStore } from "@reduxjs/toolkit";
// import { rootReducers } from "./rootReducer";

// export const store = configureStore({
//   reducer: rootReducers,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// src/store.tsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import registerReducer from '../auth/registerSlice';
import servicesSlice from '../Slice/servicesSlice';
import profileSlice from "../auth/profileSlice";
import specialtyReducer from '../Slice/specialtySlice';
import doctorReducer from '../Slice/doctorSlice'; 
import logoutReducer from '../auth/logoutSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer, 
    register: registerReducer,
    services: servicesSlice,
    profile: profileSlice,
    specialty: specialtyReducer, 
    doctor: doctorReducer, 
    logout: logoutReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;





