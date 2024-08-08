import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import { AdminLogin, Dashboard, Home, InternalServerError, Login, ManageClinic, ManageClinicOwner, ManageUser, NotFound } from "../pages";
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
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin/>} />
      <Route path="/admin/*" element={<Dashboard />}>
        
        <Route path={paths.ADMIN_DASHBOARD} element={<Dashboard />} />
        <Route path={paths.ADMIN_MANAGE_USER} element={<ManageUser />} />
        <Route path={paths.ADMIN_MANAGE_CLINIC} element={<ManageClinic />} />
        <Route path={paths.ADMIN_MANAGE_CLINIC_OWNER} element={<ManageClinicOwner />} />
        <Route path={paths.ADMIN_DASHBOARD} element={<div>Admin Dashboard</div>} />
      </Route>

    </Routes>
  );
};

export default AppRouter;
