import axiosInstance from "@/configs/config-axios"
import {  API_GET_WORKING_TIME_DOCTOR_BY_ID } from "@/constants/api";

export const getWorkingOfDoctor =async(doctorId: number)=>{
    try {
        const response = await axiosInstance.get(`${ API_GET_WORKING_TIME_DOCTOR_BY_ID}/${doctorId}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("Login failed", error);
        return [];
    }
    
}

 export const getWorkingTimeDoctor =async(doctorId: number, workingDayOfWeek: number)=>{
    try {
        const response = await axiosInstance.post(`/WorkingTime/getWorkingTimesByDoctorIdAndWorkingDayOfWeek?doctorId=${doctorId}&workingDayOfWeek=${workingDayOfWeek}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("Login failed", error);
        return [];
    }
    
}