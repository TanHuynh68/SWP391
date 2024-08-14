import axiosInstance from "@/configs/config-axios"
import { API_GET_ALL_USER } from "@/constants/api"

 export const getAllUser =async()=>{
    try {
        const response = await axiosInstance.post(API_GET_ALL_USER, {name: "", roleName: ""})
        if(response){
            console.log("response: ", response)
            return response;
        }
    } catch (error) {
        console.error("getAllUser failed", error);
        return console.error("getAllUser failed", error);
    }
    
}

export const filterUserbyNameAndRole =async(name: string, roleName:string)=>{
    try {
        const response = await axiosInstance.post(API_GET_ALL_USER, {name, roleName})
        if(response){
            console.log("response: ", response)
            return response;
        }
    } catch (error) {
        console.error("getAllUser failed", error);
        return console.error("getAllUser failed", error);
    }
    
}