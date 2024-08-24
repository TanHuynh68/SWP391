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


import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import registerReducer from '../auth/registerSlice';
import servicesSlice from '../Slice/servicesSlice';
import profileSlice from "../auth/profileSlice";
import specialtyReducer from '../Slice/specialtySlice';
import doctorReducer from '../Slice/doctorSlice'; 
import logoutReducer from '../auth/logoutSlice'; 
import managePatientSlice from '../Slice/managePatientSlice';
import registerClinicSlice from '../Slice/registerClinicSlice';
import manageDoctorSlice from '../Slice/manageDoctorSlice';
import servicesRegisterClinicSlice from '../Slice/servicesRegisterClinicSlice';
import clinicManagementtSlice from '../Slice/clinicManagementtSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    register: registerReducer,
    services: servicesSlice,
    profile: profileSlice,
    specialty: specialtyReducer, 
    doctor: doctorReducer, 
    logout: logoutReducer,
    managePatient: managePatientSlice,
    registerClinic: registerClinicSlice,
    manageDoctor: manageDoctorSlice,
    servicesRegisterClinic: servicesRegisterClinicSlice,
    clinicManagement:clinicManagementtSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;








