import React, {useState, useEffect} from 'react';

import ArticleProduct from '../components/articleProduct'
import { useDispatch, useSelector } from "react-redux";
import {selectHommeProduct, setHommeProduct } from "../slices/productSlice";
import {selectBasket , setModifyBasket } from "../slices/basketSlice";
import {getCatProduct} from "../api/product"

const ProductHomme =(props)=>{
    
    const product = useSelector(selectHommeProduct);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
   
    useEffect (()=>{
      getCatProduct(1)
      .then((response)=>{
          console.log(response)
          dispatch(setHommeProduct(response.result))
      })
      .catch((err)=>console.log(err))
    },[props])
    
    return (
        <div className="product"> 
            <h2 className="titre">Produits homme</h2>
           	    {product.length > 0 ? <ul>
    			{product.map((b)=>{
    		    	return <ArticleProduct key={b.id} produit={b}/>
    			})}
    			</ul>:<p>Aucun produit</p>
           	    }
        </div>
    )
}


export default ProductHomme;
