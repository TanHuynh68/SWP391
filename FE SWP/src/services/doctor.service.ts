import axiosInstance from "@/configs/config-axios";
import { API_DOCTOR_CANCEL_BOOKING, API_EDIT_RESULT, API_GET_ALL_BOOKING } from "@/constants/api";
import { MedicineFormValues } from "@/pages/doctor/manage-booking";

export const getAllBooking = async (id: number) => {
    try {
        const response = await axiosInstance.post(`${API_GET_ALL_BOOKING}${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllBooking failed", error);
        return [];
    }
}

export const editResult = async (id: number, value:MedicineFormValues, result: string) => {
    try {
        const response = await axiosInstance.patch(`${API_EDIT_RESULT}/${id}?result=${result}`, value.medicines)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllBooking failed", error);
        return [];
    }
}

export const cancelBooking = async (id: number) => {
    try {
        const response = await axiosInstance.post(`${API_DOCTOR_CANCEL_BOOKING}${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllBooking failed", error);
        return [];
    }
}
