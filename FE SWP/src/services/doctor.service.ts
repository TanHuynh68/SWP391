import axiosInstance from "@/configs/config-axios";
import { API_DOCTOR_ADD_BOOKING_BY_WEEKS, API_DOCTOR_CANCEL_BOOKING, API_DOCTOR_GET_ALL_BOOKING_BY_CUSTOMER_PHONE, API_EDIT_RESULT, API_GET_ALL_BOOKING, API_GET_WORKING_TIME_DOCTOR_BY_ID } from "@/constants/api";
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
        console.error("editResult failed", error);
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
        console.error("cancelBooking failed", error);
        return [];
    }
}

export const addBookingByWeeks = async (weeksDuration: number,slot: number,type: number,bookingDate: Date,customerId: number,doctorID: number,clinicId: number,serviceId: number) => {
    try {
        const response = await axiosInstance.post(`${API_DOCTOR_ADD_BOOKING_BY_WEEKS}${weeksDuration}`,{
            slot, type, bookingDate, customerId, doctorID, clinicId, serviceId
        })
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("addBookingByWeeks failed", error);
        return [];
    }
}

export const getAllWorkingTimeOfDoctor = async (id:number) => {
    try {
        const response = await axiosInstance.post(`${API_GET_WORKING_TIME_DOCTOR_BY_ID}${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllWorkingTimeOfDoctor failed", error);
        return [];
    }
}

export const getAllBookingByCustomerPhone = async (phoneNumber:string) => {
    try {
        const response = await axiosInstance.post(`${API_DOCTOR_GET_ALL_BOOKING_BY_CUSTOMER_PHONE}${phoneNumber}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllBookingByCustomerPhone failed", error);
        return [];
    }
}

