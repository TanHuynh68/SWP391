import { paths } from "@/constants";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const role = {
    ADMIN: "ADMIN",
    CLINIC_OWNER: "CLINICOWNER",
    DOCTOR: "DOCTOR",
    CUSTOMER: "CUSTOMER",
}
const useRedirect = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user")
    const parsedUser = user ? JSON.parse(user) : null;
    const userRole = parsedUser?.role;
    const location = useLocation();
    const path = location.pathname
    useEffect(() => {
        if (userRole) {
            const token = localStorage.getItem("token");
            if (isTokenExpired(token)) {
                logout(userRole);
            }
            Redirect();
        }
    }, [userRole, path]);

    const logout = (role:string) => { 
        if(role === "ADMIN"){
            window.location.href = paths.ADMIN_LOGIN; 
        }else{
            window.location.href = paths.LOGIN; 
        }
        localStorage.clear();
        message.error("Token expired!")
    };

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Thời gian hiện tại theo Unix timestamp
            return decodedToken.exp < currentTime; // True nếu token đã hết hạn
        } catch (error) {
            console.error("Invalid token:", error);
            return true; // Nếu có lỗi khi decode token, coi như token đã hết hạn
        }
    };

    const Redirect = () => {
        switch (userRole) {
            case role.ADMIN:
                if (!path.includes("admin" || paths.ADMIN_LOGIN)) {
                    navigate(paths.ADMIN_HOME)
                }
                break;
            case role.CLINIC_OWNER:
                if (!path.includes("clinic-owner" || paths.LOGIN)) {
                    navigate(paths.REGISTER_CLINIC);
                }
                break
            case role.CUSTOMER:
                if (!path.includes("customer" || paths.LOGIN)) {
                    navigate(paths.HOME);
                }
                break;
                case role.DOCTOR:
                if (!path.includes("doctor" || paths.LOGIN)) {
                    navigate(paths.DOCTOR_MANAGE_BOOKING)
                }
                break;
            default:
                navigate(paths.HOME);
        }
    }
    const canAccess = (allowedRoles: string[]) => {
        return userRole && allowedRoles.includes(userRole);
    };

    return { canAccess };
}
export default useRedirect;