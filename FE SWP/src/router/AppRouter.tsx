import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { paths } from "../constants";
import {
  AdminDashboard, AdminLogin, ClinicPage, CustomerBookingHistory, CustomerBookingPage, CustomerLayout, Dashboard, Home, InternalServerError, Login, ManageBooking, ManageClinic, ManageClinicOwner, ManageDoctor, ManageMedicalExaminationSchedule, ManagePatient, ManageUser,
  NotFound,
  RegisterClinic,
  ScheduleOfWeek
} from "../pages";
import SignUp from "@/pages/Register";
import { role} from "@/redux/hooks/usRedirect";
import useRedirect from "@/redux/hooks/usRedirect";
import SpecialtyPage from "@/pages/specialty-page";
import DentalDetails from "@/pages/dental-details";
import DentalHandbook from "@/pages/dentalHandbook";

const AppRouter: React.FC = () => {
  const {canAccess} = useRedirect();
  return (
    <Routes>
      <Route path="/status-404" element={<NotFound />} />
      <Route path="/status-500" element={<InternalServerError />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path={paths.REGISTER} element={<SignUp />} />
      <Route path={paths.HOME} element={<Home />} />
      <Route path={paths.CLINIC_PAGE} element={<ClinicPage />} />
      <Route path={paths.DENTAL_DETAILS} element={<DentalDetails/>} />
      <Route path={paths.DENTAL_HANDBOOK} element={ <DentalHandbook />} />
      <Route path={paths.SPECIAL_PACKAGE} element={ <SpecialtyPage/>} />


      {/* Customer */}
      <Route path="/customer/*" element={canAccess([role.CUSTOMER]) ? <CustomerLayout /> : <Navigate to={paths.HOME}/>}>
        <Route path={paths.BOOKING_PAGE} element={canAccess([role.CUSTOMER]) ? <CustomerBookingPage /> : <Navigate to={paths.HOME}/>} />
        <Route path={paths.BOOKING_HISTORY} element={canAccess([role.CUSTOMER]) ? <CustomerBookingHistory /> : <Navigate to={paths.HOME}/>} />        
        <Route path={paths.CUSTOMER_CLINIC_PAGE}element={canAccess([role.CUSTOMER]) ? <ClinicPage /> : <Navigate to={paths.HOME}/>} />
        
        <Route path={paths.CLINIC_DETAIL} element={ canAccess([role.CUSTOMER]) ? <DentalDetails/> : <Navigate to={paths.HOME}/>} />
      <Route path={paths.DENTAL_HANDBOOK} element={ canAccess([role.CUSTOMER]) ? <DentalHandbook /> : <Navigate to={paths.HOME}/>} />
      <Route path={paths.SPECIAL_PACKAGE} element={ canAccess([role.CUSTOMER]) ?<SpecialtyPage/> : <Navigate to={paths.HOME}/>} />
        
      </Route>
      {/* Clinic Owner */}
      <Route path="/clinic-owner/*" element={canAccess([role.CLINIC_OWNER]) ? <Dashboard /> : <Navigate to={paths.HOME}/>}>
        <Route path={paths.REGISTER_CLINIC} element={<RegisterClinic />} />
        <Route path={paths.MANAGE_DOCTOR} element={<ManageDoctor />} />
        <Route path={paths.MANAGE_PATIENT} element={<ManagePatient />} />
        <Route path={paths.MANAGE_MEDICAL_EXAMINATION_SCHEDULE} element={<ManageMedicalExaminationSchedule/>} />
        
      </Route>
      {/* Dentist
      <Route path="/dentist/*" element={<Dashboard />}>
        <Route path={paths.DENTIST_CHAT_WINDOW} element={<ChatWindow />} />
      </Route> */}
      <Route path="/doctor/*" element={canAccess([role.DOCTOR]) ? <Dashboard /> : <Navigate to={paths.HOME}/>}>
        <Route path={paths.DOCTOR_MANAGE_BOOKING}  element={canAccess([role.DOCTOR]) ? <ManageBooking/> : <Navigate to={paths.HOME}/>} />
        <Route path={paths.DOCTOR_SCHEDULE_OF_WEEK}  element={canAccess([role.DOCTOR]) ? <ScheduleOfWeek/> : <Navigate to={paths.HOME}/>} />
      </Route>
      {/* Admin */}
      <Route  path={"/admin/login"} element={<AdminLogin />} />
      <Route path="/admin/*" element={canAccess([role.ADMIN]) ?<Dashboard />: <Navigate to={paths.HOME}/>}>
        <Route path={paths.ADMIN_DASHBOARD} element={canAccess([role.ADMIN]) ? <AdminDashboard /> : <Navigate to={paths.HOME}/> }/>
        <Route path={paths.ADMIN_MANAGE_USER} element={canAccess([role.ADMIN]) ?<ManageUser />: <Navigate to={paths.HOME}/>} />
        <Route path={paths.ADMIN_MANAGE_CLINIC} element={canAccess([role.ADMIN]) ?<ManageClinic />: <Navigate to={paths.HOME}/>} />
        <Route path={paths.ADMIN_MANAGE_CLINIC_OWNER} element={canAccess([role.ADMIN]) ?<ManageClinicOwner />: <Navigate to={paths.HOME}/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
