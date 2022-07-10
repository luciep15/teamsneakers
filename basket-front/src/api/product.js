import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("token");

export const saveOneProduct = (datas) => {
   return axios.post(config.api_url + '/api/v1/product/save', datas ,{headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
}

export const changeImg = (datas) => {
   return axios.post(config.api_url + '/api/v1/product/updateImg', datas ,{headers: {"x-access-token": token}})   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
}

export const updateOneProduct = (datas, id) => {
   return axios.put(config.api_url + '/api/v1/product/update/' + id , datas ,{headers: {"x-access-token": token}})    
    .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
     
}

export const deleteOneProduct = (id) => {
    return axios.delete(config.api_url + '/api/v1/product/delete/' + id , {headers: {"x-access-token": token}})    
    .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        }) 
    
}
export const  getAllProduct = ()=>{
   return axios.get(config.api_url + '/api/v1/allproduct')   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}

export const  getNewProduct = ()=>{
   return axios.get(config.api_url + '/api/v1/newallproduct')   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}

export const  getCatProduct = (category_id)=>{
   return axios.get(config.api_url + '/api/v1/product/all/' + category_id)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}

export const  getSousCatProduct = (sous_category_id)=>{
   return axios.get(config.api_url + '/api/v1/product/all/cat/' + sous_category_id)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}

export const  getOneProduct = (id)=>{
   return axios.get(config.api_url + '/api/v1/product/' + id)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}

export const  getOneProductRef = (reference)=>{
   return axios.get(config.api_url + '/api/v1/product/one/' + reference)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}

export const  getOneProductName = (name)=>{
   return axios.get(config.api_url + '/api/v1/product/one/name/' + name)   
   .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })  
}