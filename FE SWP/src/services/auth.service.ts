import axiosInstance from "@/configs/config-axios"
import { API_LOGIN } from "@/constants/api"

 export const login =async(email:string, password:string)=>{
    try {
        const response = await axiosInstance.post(API_LOGIN,{
            email: email,
            password: password
        })
        if(response){
            return response;
        }
    } catch (error) {
        console.error("Login failed", error);
        return [];
    }
    
}