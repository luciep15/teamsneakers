import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("token");

export const saveUser = (data) => {
 return axios.post(config.api_url + '/api/v1/user/save', data)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })
    
}

export const loginUser = (data) => {
 return axios.post(config.api_url + '/api/v1/user/login', data)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })
    
}

export const getOneUser = (id) => {
 return axios.get(config.api_url + '/api/v1/user/' + id , {headers: {"x-access-token": token}} )   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })
    
}

export const updateOneUser = (data , id) => {
 return axios.put(config.api_url + '/api/v1/user/update/' + id , data ,  {headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })
    
}

export const updatePasswordUser = (data , id) => {
 return axios.put(config.api_url + '/api/v1/password/update/' + id , data ,  {headers: {"x-access-token": token}})   
   .then((response)=>{
       console.log("password" , response.data)
            return response.data;
        })
        .catch((err)=>{
            return err
        })
    
}

export const forgotPassword = (data) => {
 return axios.post(config.api_url + '/api/v1/user/forgot', data)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })
}


