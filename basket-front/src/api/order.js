import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("token");

export const saveOneOrder = (datas) => {
   return axios.post(config.api_url + '/api/v1/order/save', datas ,{headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
}

export const paymentOrders = (datas) => {
    return axios.post(config.api_url+'/api/v1/order/payment', datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const validatePayment = (datas) => {
    return axios.put(config.api_url+"/api/v1/order/validate", datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const GetAllOrders = (user_id) => {
   return axios.get(config.api_url + '/api/v1/orders/'+ user_id ,{headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
}

export const GetOneOrder = (id) => {
   return axios.get(config.api_url + '/api/v1/oneOrder/'+ id,{headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
}

export const GetDetailOrders = (order_id) => {
   return axios.get(config.api_url + '/api/v1/detailOrders/'+ order_id,{headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
}