import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import {
  AdminDashboard, AdminLogin, ChatWindow, CustomerBookingPage, CustomerLayout, Dashboard, Home, InternalServerError, Login, ManageClinic, ManageClinicOwner, ManageUser,
  NotFound
} from "../pages";
import SignUp from "@/pages/Register";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/status-404" element={<NotFound />} />
      <Route path="/status-500" element={<InternalServerError />} />
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/sign-up/*" element={<SignUp />} />
      <Route path={paths.HOME} element={<Home />} />
      {/* Customer */}
      <Route path="/customer/*" element={<CustomerLayout />}>
        <Route path={paths.BOOKING_PAGE} element={<CustomerBookingPage />} />
      </Route>

      {/* Dentist */}
      <Route path="/dentist/*" element={<Dashboard />}>
        <Route path={paths.DENTIST_CHAT_WINDOW} element={<ChatWindow />} />
      </Route>
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<Dashboard />}>
        <Route path={paths.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={paths.ADMIN_MANAGE_USER} element={<ManageUser />} />
        <Route path={paths.ADMIN_MANAGE_CLINIC} element={<ManageClinic />} />
        <Route path={paths.ADMIN_MANAGE_CLINIC_OWNER} element={<ManageClinicOwner />} />
        <Route path={paths.ADMIN_DASHBOARD} element={<div>Admin Dashboard</div>} />
      </Route>

    </Routes>
  );
};

export default AppRouter;
