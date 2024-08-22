import axiosInstance from "@/configs/config-axios"
import { API_CREATE_BOOKING, API_GET_ALL_DOCTOR_BY_CLINIC, API_GET_ALL_SERVICES_OF_CLINIC, API_GET_CLINIC_BY_ID, API_GET_PATIENT } from "@/constants/api"

export const getAllDoctorByClinic = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${API_GET_ALL_DOCTOR_BY_CLINIC}${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllDoctorByClinic failed", error);
        return [];
    }

}

export const getClinicById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${API_GET_CLINIC_BY_ID}${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getClinicById failed", error);
        return [];
    }
}

export const getAllServicesOfClinic = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${API_GET_ALL_SERVICES_OF_CLINIC}${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getAllServicesOfClinic failed", error);
        return [];
    }
}

export const createBooking = async (slot: number, type: number, bookingDate: Date, customerId: number, doctorID:number, clinicId: number, serviceId: number) => {
    try {
        const response = await axiosInstance.post(`${API_CREATE_BOOKING}`,{
            slot, type, bookingDate, customerId,doctorID, clinicId, serviceId
        })
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("createBooking failed", error);
        return error;
    }
}

export const getPatient = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${API_GET_PATIENT}/${id}`)
        if (response) {
            return response;
        }
    } catch (error) {
        console.error("getPatient failed", error);
        return [];
    }
}


