import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import { AdminDashboard, Home } from "../pages";
import Login from "@/pages/Login";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Route for Guest */}
      <Route path={paths.HOME} element={<Home />} />
      <Route path="/login/*" element={<Login/>} />
      <Route path="/admin/*" element={<AdminDashboard />}>
        <Route path={paths.ADMIN_DASHBOARD} element={<div>Admin Dashboard</div>} />
      </Route>
      
    </Routes>
  );
};

export default AppRouter;
