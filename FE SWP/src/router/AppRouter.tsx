import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import { Dashboard, Home, Login, ManageClinic, ManageClinicOwner, ManageUser } from "../pages";
import SignUp from "@/pages/Register";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={paths.LOGIN} element={<Login />} />
      <Route path="/login/*" element={<Login />} />
        <Route path="/sign-up/*" element={<SignUp/>} />
      <Route path={paths.HOME} element={<Home />} />
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
