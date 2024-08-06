import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import { AdminDashboard, Home, Demo, Demo2 } from "../pages";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Route for Guest */}
      <Route path={paths.HOME} element={<Home />} />
      <Route path="/admin/*" element={<AdminDashboard />}>
        {/* <Route path={paths.ADMIN_DASHBOARD} element={<AdminDashboard />}/> */}
        <Route path={'demo1'} element={<Demo/>}/>
        <Route path={'demo2'} element={<Demo2/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;
