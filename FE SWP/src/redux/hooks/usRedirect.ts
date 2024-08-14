import { paths } from "@/constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const role = {
    ADMIN: "ADMIN",
    CLINIC_OWNER: "clinic_owner",
    DOCTOR: "doctor",
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
            Redirect();
        }
    }, [userRole, path]);
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