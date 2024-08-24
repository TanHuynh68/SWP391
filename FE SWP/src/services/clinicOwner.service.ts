import axiosInstance from "@/configs/config-axios"
import { API_GET_ALL_BOOKINGS_OF_CLINIC, API_GET_ALL_CLINICS_BY_OWNER_ID, API_GET_ALL_DOCTORS_OF_CLINIC } from "@/constants/api"

 export const getAllClinicByOwnerId =async(id:number)=>{
    try {
        const response = await axiosInstance.get(`${API_GET_ALL_CLINICS_BY_OWNER_ID}${id}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("getAllClinicByOwnerId failed", error);
        return [];
    }
    
}

export const getAllBookingOfCLinic =async(id:number)=>{
    try {
        const response = await axiosInstance.get(`${API_GET_ALL_BOOKINGS_OF_CLINIC}${id}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("getAllBookingOfCLinic failed", error);
        return [];
    }
    
}

export const getAllDoctorOfCLinic =async(id:number)=>{
    try {
        const response = await axiosInstance.get(`${API_GET_ALL_DOCTORS_OF_CLINIC}${id}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("getAllDoctorOfCLinic failed", error);
        return [];
    }
    
}

export const UpdateDoctorForWeeklyBooking =async(bookingId:number, doctorId:number)=>{
    try {
        const response = await axiosInstance.patch(`/Booking/UpdateDoctorIdForWeeklyBooking/${bookingId}?doctorId=${doctorId}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("UpdateDoctorForWeeklyBooking failed", error);
        return [];
    }
    
}