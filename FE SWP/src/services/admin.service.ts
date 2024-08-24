import axiosInstance from "@/configs/config-axios"
import { API_ADD__CLINIC_OWNER, API_CHANGE_STATUS_CLINIC_ACTIVE_OR_INACTIVE, API_CHANGE_STATUS_CLINIC_PENDING_TO_ACTIVE, API_CHANGE_STATUS_USER_ACTIVE_OR_INACTIVE, API_CHANGE_STATUS_USER_PENDING_TO_ACTIVE, API_DELETE_CLINIC_PENDING, API_DELETE_USER_PENDING, API_GET_ALL_CLINIC, API_GET_ALL_CLINIC_OWNER, API_GET_ALL_CLINIC_PENDING, API_GET_CLINIC_BY_NAME } from "@/constants/api"

export const getAllClinic = async () => {
    try {
        const response = await axiosInstance.get(API_GET_ALL_CLINIC)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllClinic failed", error);
        return console.error("getAllClinic failed", error);
    }

}

export const getAllClinicPending = async () => {
    try {
        const response = await axiosInstance.get(API_GET_ALL_CLINIC_PENDING)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllClinic failed", error);
        return console.error("getAllClinic failed", error);
    }

}
export const getAllClinicOwner = async (name: string, roleName: string) => {
    try {
        const response = await axiosInstance.post(API_GET_ALL_CLINIC_OWNER, { name, roleName })
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllClinic failed", error);
        return console.error("getAllClinic failed", error);
    }

}

export const searchUser = async (name: string, roleName: string) => {
    try {
        const response = await axiosInstance.post(API_GET_ALL_CLINIC_OWNER, { name, roleName })
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("searchUser failed", error);
        return console.error("searchUser failed", error);
    }
}

export const getClinicByName = async (name: string) => {
    try {
        const response = await axiosInstance.get(`${API_GET_CLINIC_BY_NAME}/${name}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("searchUser failed", error);
        return console.error("searchUser failed", error);
    }
}

export const addClinicOwner = async (fullName: string, gender: number, email: string, password:string) => {
    try {
      await axiosInstance.post(API_ADD__CLINIC_OWNER, {fullName,gender, email, password  })
        // message.success("Add Clinic Owner Successfully!")
        return {success: true};
    } catch (error) {
        console.error("addClinicOwner failed", error);
        // message.success("Add Clinic Owner Failed!")
        return console.error("addClinicOwner failed", error);
        
    }
}

export const updateStatusUserActiveOrInactive = async (id: number) => {
    try {
        const response = await axiosInstance.put(`${API_CHANGE_STATUS_USER_ACTIVE_OR_INACTIVE}/${id}`)
        console.log("id: ", id)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("updateStatusUserActiveOrInactive failed", error);
        return console.error("searchupdateStatusUserActiveOrInactiveUser failed", error);
    }
}

export const deleteUserPending = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${API_DELETE_USER_PENDING}/${id}`)
        console.log("id: ", id)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("deleteUserPending failed", error);
        return console.error("deleteUserPending failed", error);
    }
}

export const updateStatusUserPendingToActive = async (id: number) => {
    try {
        const response = await axiosInstance.put(`${API_CHANGE_STATUS_USER_PENDING_TO_ACTIVE}/${id}`)
        console.log("id: ", id)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("updateStatusUserPendingToActive failed", error);
        return console.error("updateStatusUserPendingToActive failed", error);
    }
}

export const updateClinicStatusPendingToActive = async (id: number) => {
    try {
        const response = await axiosInstance.put(`${API_CHANGE_STATUS_CLINIC_PENDING_TO_ACTIVE}/${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("searchUser failed", error);
        return console.error("searchUser failed", error);
    }
}

export const deleteClinicPending = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${API_DELETE_CLINIC_PENDING}/${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("searchUser failed", error);
        return console.error("searchUser failed", error);
    }
}

export const updateClinicStatusActiveOrInactive = async (id: number) => {
    try {
        const response = await axiosInstance.put(`${API_CHANGE_STATUS_CLINIC_ACTIVE_OR_INACTIVE}/${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("searchUser failed", error);
        return console.error("searchUser failed", error);
    }
}

