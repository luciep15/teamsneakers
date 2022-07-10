import React, {useState, useEffect} from 'react';

import ArticleProduct from '../components/articleProduct'
import { useDispatch, useSelector } from "react-redux";
import { selectNewProduct, setNewProduct } from "../slices/productSlice";
import { selectBasket , setModifyBasket } from "../slices/basketSlice";
import { selectFavorite , setModifyFavorite } from "../slices/favoriteSlice";
import {getNewProduct} from "../api/product"

const New =(props)=>{
    
    const product = useSelector(selectNewProduct);
    const basket = useSelector(selectBasket);
    const favorite = useSelector(selectFavorite);
    const dispatch = useDispatch();
   
    useEffect (()=>{
      getNewProduct()
      .then((response)=>{
          console.log(response)
          dispatch(setNewProduct(response.result))
      })
      .catch((err)=>console.log(err))
    },[props])
    
    return (
        <div className="product"> 
            <h2 className="titre">Derniers produits ajoutés</h2>
           	    {product.length > 0 ? <ul>
    			{product.map((b)=>{
    		    	return <ArticleProduct key={b.id} produit={b}/>
    			})}
    			</ul>:<p>Aucun produit</p>
           	    }
        </div>
    )
}


export default New;

