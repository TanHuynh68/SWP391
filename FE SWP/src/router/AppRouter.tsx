
import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import { AdminDashboard, Home, Login } from "../pages";
// import { lazy } from "react";
// import Login from "@/pages/Login";
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={paths.LOGIN} element={<Login
       />} />
      <Route path={paths.HOME} element={<Home />} />
      {/* Route for Guest */}
      <Route path={paths.HOME} element={<Home />} />
      <Route path="/admin/*" element={<AdminDashboard />}>
        <Route path={paths.ADMIN_DASHBOARD} />
      </Route>
    </Routes>
  );
};

export default AppRouter;









