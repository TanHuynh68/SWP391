import axiosInstance from "@/configs/config-axios"
import { API_ACTIVE_AND_INACTIVE_USER, API_GET_ALL_USER, API_PENDING_USER } from "@/constants/api"

export const getAllUser = async () => {
    try {
        const response = await axiosInstance.post(API_GET_ALL_USER, { name: "", roleName: "" })
        if (response) {
            console.log("response: ", response)
            return response;
        }
    } catch (error) {
        console.error("getAllUser failed", error);
        return console.error("getAllUser failed", error);
    }

}

export const getUserActiveAndInactive = async () => {
    try {
        const response = await axiosInstance.get(API_ACTIVE_AND_INACTIVE_USER)
        if (response) {
            console.log("response: ", response)
            return response;
        }
    } catch (error) {
        console.error("getUserActiveAndInactive failed", error);
        return console.error("getUserActiveAndInactive failed", error);
    }

}

export const getPendingUser = async () => {
    try {
        const response = await axiosInstance.get(API_PENDING_USER)
        if (response) {
            console.log("response: ", response)
            return response;
        }
    } catch (error) {
        console.error("getUserActiveAndInactive failed", error);
        return console.error("getUserActiveAndInactive failed", error);
    }

}

export const filterUserbyNameAndRole = async (name: string, roleName: string) => {
    try {
        const response = await axiosInstance.post(API_GET_ALL_USER, { name, roleName })
        if (response) {
            console.log("response: ", response)
            return response;
        }
    } catch (error) {
        console.error("getAllUser failed", error);
        return console.error("getAllUser failed", error);
    }

}