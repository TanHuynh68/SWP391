import axiosInstance from "@/configs/config-axios"
import { API_GET_ALL_DOCTOR_BY_CLINIC } from "@/constants/api"

 export const getAllDoctorByClinic =async(id:number)=>{
    try {
        const response = await axiosInstance.get(`${API_GET_ALL_DOCTOR_BY_CLINIC}/${id}`)
        if(response){
            return response;
        }
    } catch (error) {
        console.error("Login failed", error);
        return [];
    }
    
}