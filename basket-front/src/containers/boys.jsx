import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ArticleProduct from '../components/articleProduct'
import { useDispatch, useSelector } from "react-redux";
import {selectEnfantProduct, setEnfantProduct } from "../slices/productSlice";
import {selectBasket , setModifyBasket } from "../slices/basketSlice";
import { getSousCatProduct} from "../api/product"

const ProductBoys =(props)=>{
    
    const product = useSelector(selectEnfantProduct);
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();
   
    useEffect (()=>{
        getSousCatProduct(2)
        .then((response)=>{
          console.log(response)
          dispatch(setEnfantProduct(response.result))
        })
        .catch((err)=>console.log(err))
    },[props])
  
 
    return (
        <div className="product"> 
            <h2 className="titre">Produits garçons</h2>
            <Link className="retour" to="/enfant"><i className="fa fa-arrow-circle-left"></i></Link>
            <div>
                <Link to="/girls" className="Lien_category">Fille</Link>
                <Link to="/boys" className="Lien_category">Garçon</Link>
            </div>
           	    {product.length > 0 ? <ul>
    			{product.map((b)=>{
    		    	return <ArticleProduct key={b.id} produit={b}/>
    			})}
    			</ul>:<p>Aucun produit</p>
           	    }
        </div>
    )
}

export default ProductBoys;