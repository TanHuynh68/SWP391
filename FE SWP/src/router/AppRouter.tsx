import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { paths } from "../constants";
import {
  AdminDashboard, AdminLogin, ChatWindow, CustomerBookingPage, CustomerLayout, Dashboard, Home, InternalServerError, Login, ManageClinic, ManageClinicOwner, ManageDoctor, ManageMedicalExaminationSchedule, ManagePatient, ManageUser,
  NotFound,
  RegisterClinic
} from "../pages";
import SignUp from "@/pages/Register";
import DentalHandbook from "@/pages/dentalHandbook";
import { role} from "@/redux/hooks/usRedirect";
import useRedirect from "@/redux/hooks/usRedirect";
const AppRouter: React.FC = () => {
  const {canAccess} = useRedirect();
  return (
    <Routes>
      <Route path="dental-handbook" element={<DentalHandbook />} />
      <Route path="/status-404" element={<NotFound />} />
      <Route path="/status-500" element={<InternalServerError />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path={paths.REGISTER} element={<SignUp />} />
      <Route path={paths.HOME} element={<Home />} />
      {/* Customer */}
      <Route path="/customer/*" element={canAccess([role.CUSTOMER]) ? <CustomerLayout /> : <Navigate to={paths.HOME}/>}>
        <Route path={paths.BOOKING_PAGE} element={canAccess([role.CUSTOMER]) ? <CustomerBookingPage /> : <Navigate to={paths.HOME}/>} />
      </Route>
      {/* Clinic Owner */}
      <Route path="/clinic-owner/*" element={canAccess([role.CLINIC_OWNER]) ? <Dashboard /> : <Navigate to={paths.HOME}/>}>
        <Route path={paths.REGISTER_CLINIC} element={<RegisterClinic />} />
        <Route path={paths.MANAGE_DOCTOR} element={<ManageDoctor />} />
        <Route path={paths.MANAGE_PATIENT} element={<ManagePatient />} />
        <Route path={paths.MANAGE_MEDICAL_EXAMINATION_SCHEDULE} element={<ManageMedicalExaminationSchedule/>} />
      </Route>
      {/* Dentist */}
      <Route path="/dentist/*" element={<Dashboard />}>
        <Route path={paths.DENTIST_CHAT_WINDOW} element={<ChatWindow />} />
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
