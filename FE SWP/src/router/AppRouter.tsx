import React from "react";
import { Routes, Route } from "react-router-dom";
import { paths } from "../constants";
import {Home} from "../pages";
const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Route for Guest */}
            <Route path={paths.HOME} element={<Home/>} />
            {/* <Route path={paths.LOGIN} element={<LoginPage />} />
            <Route path={paths.ABOUT} element={<About />} /> */}
        </Routes>
    )
}
export default AppRouter;