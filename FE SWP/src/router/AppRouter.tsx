// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { paths } from "../constants";
// import { Routes, Route } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
const Home = lazy(() => import("@pages/home/index"));
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";

export const NormalRouters: RouteObject[] = [ 
    {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
]






// const AppRouter: React.FC = () => {
//     return (
//         <Routes>
//             {/* Route for Guest */}
//             <Route path={paths.HOME} element={<Home/>} />
//             <Route path={paths.LOGIN} element={<Login/>} />

//             {/* <Route path={paths.ABOUT} element={<About />} /> */}
//         </Routes>
//     )
// }
// export default AppRouter;
