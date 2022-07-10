import React, {useState, useEffect} from 'react';

import ArticleProduct from '../components/articleProduct'
import { useDispatch, useSelector } from "react-redux";
import {selectFemmeProduct, setFemmeProduct } from "../slices/productSlice";
import {selectBasket , setModifyBasket } from "../slices/basketSlice";
import {getCatProduct} from "../api/product"

const ProductFemme =(props)=>{
    
    const product = useSelector(selectFemmeProduct);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
    
    useEffect (()=>{
      getCatProduct(2)
      .then((response)=>{
          console.log(response)
          dispatch(setFemmeProduct(response.result))
      })
      .catch((err)=>console.log(err))
    },[props])
  
    return (
        <div className="product"> 
            <h2 className="titre">Produits femme</h2>
           	    {product.length > 0 ? <ul>
    			{product.map((b)=>{
    		    	return <ArticleProduct key={b.id} produit={b}/>
    			})}
    			</ul>:<p>Aucun produit</p>
           	    }
        </div>
    )
}


export default ProductFemme;
