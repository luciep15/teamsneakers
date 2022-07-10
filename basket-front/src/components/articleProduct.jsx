import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Popup from './popup';
import {sizeEnfant} from '../helpers/size';
import {sizeFemme} from '../helpers/size';
import {sizeHomme} from '../helpers/size';
import { useDispatch, useSelector } from "react-redux";
import { selectBasket, setModifyBasket } from "../slices/basketSlice";
import { selectFavorite , setModifyFavorite } from "../slices/favoriteSlice";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";


const ArticleProduct = (props)=>{
	
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null);
    const [isPopUp, setIsPopUp] = useState(false)
    const [size , setSize] = useState("");
    
    const basket = useSelector(selectBasket)
    const favorite = useSelector(selectFavorite)
    const dispatch = useDispatch()
    
    const [isInFavorite , setIsInFavorite] = useState(false)
  
  
    // au click il y a l'ajout d'un article au panier
	const addToBasket = (basket , newProduct , quantityInCart , size)=>{
		let myBasket = [...basket]
		// on ajoute le produit au panier (action)
		if(size !== "" && quantity !== ""){
			
	    	let same = myBasket.findIndex((b)=> b.id === newProduct.id);
			
			if(same === -1){
			 // dans ce cas le produit n'existe pas on l'ajoute au tableau basket
				let prod = JSON.parse(JSON.stringify(newProduct))
				
				prod.quantityInCart = parseInt(quantityInCart)
				
				prod.size = parseInt(size)
				
				myBasket.push(prod)
			}else{
			//on ajoute juste la quantityInCart
				myBasket = JSON.parse(JSON.stringify(myBasket))
				if(myBasket[same].size === parseInt(size)){
					
					myBasket[same].quantityInCart += parseInt(quantityInCart)
					
					setError("Attention, vous avez déjà ajouté ce produit dans votre panier")
				}else{
					let prod = JSON.parse(JSON.stringify(newProduct))
				
					prod.quantityInCart = parseInt(quantityInCart)
					
					prod.size = parseInt(size)
					
					myBasket.push(prod)
				}
			
			}
		 console.log("myBasket", myBasket)
		 let lsBasket = JSON.stringify(myBasket);
         window.localStorage.setItem('basket', lsBasket);
    	 dispatch(setModifyBasket(myBasket))
    	 setIsPopUp(true)
		}else{
	        //affiche une erreur dans la console ou à l'endroit que tu souhaite
	        setMsg("Choisissez une pointure et une quantité!")
	    }
	}
	
	
	
	
	/*AJOUTER UN ARTICLE AUX FAVORIS*/
	 const addToFavorite = (favorite, newProduit , isInFavorite)=>{
       let myFavorite = [...favorite]
       let same = myFavorite.findIndex((b)=> b.id === newProduit.id);
        
		if(same === -1) {
		   	let prod = JSON.parse(JSON.stringify(newProduit))
		   	prod.isInFavorite = true;
		   	myFavorite.push(prod)
		   	let lsFavorite = JSON.stringify(myFavorite);
		    //console.log(lsFavorite)
	        window.localStorage.setItem('favorite', lsFavorite);
		    dispatch(setModifyFavorite(myFavorite))
		}
	}

        
    
    /*ENLEVER UN ARTICLE DES FAVORIS*/
    const removeToFavorite = (favorite, myProduct) =>{
        let newFavorite = favorite.filter(b => b.id !== myProduct.id);
        
        let lsFavorite = JSON.stringify(newFavorite);
        window.localStorage.setItem('favorite', lsFavorite);
        
        dispatch(setModifyFavorite(newFavorite))
    }
	

	
	return (
        <li className="product-mosaic">
         {msg !== null && <p className="msgError">{msg}</p>}
        <Popup  
    		isPopUp={isPopUp}
    		msg={"Vous avez ajouté : "+quantity+" paire de basket de taille "+size+" à votre panier !"}
    		error={error}
    		onClickClose={()=>{
    			setIsPopUp(false)
    			setQuantity(1)
    			setSize("")
    		}}
    	/>
            {/*on affiche un lien avec les infos de l'articles. le lien nous redirige vers la page detail/:id */}
            <Link to={"/detail/"+ props.produit.id}>
                <div>
					<h3>{props.produit.name}</h3>
					<CloudinaryContext cloudName="dapuyno3v">
			            <div>
			              <Image publicId={props.produit.photo}>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					<p>{props.produit.description.substr(0, 30)}...</p>
					<p>Référence: {props.produit.reference}</p>
					<span>{props.produit.price}€</span>
				</div>
		    </Link>
		    
		    <div className="choix">
		    {/*condition pour choisir les tailles de chaussure a afficher selon la category*/}
		    
			    <select name="option" onChange={(e)=>{
	                    setSize(e.currentTarget.value);
	                    }}>
	        		{props.produit.category_id==="1"?
							sizeHomme.map((size, index)=>{
								return (<option key={index} value={size}>
											Taille:{size}
										</option>)
							})
						: props.produit.category_id==="2" ?
							sizeFemme.map((size, index)=>{
								return (<option key={index} value={size}>
											Taille:{size}
										</option>)
							})
						:sizeEnfant.map((size, index)=>{
							return (<option key={index} value={size}>
										Taille:{size}
									</option>)
						})
					}
	            </select>
	            
	            <input
		            type="number"
		            value={quantity}
		            min={1}
		            onChange={(e)=>{
		                setQuantity(e.currentTarget.value)
		            }}
	            />
	            <button
			        className="addToBasket"
			        onClick={(e)=>{
							addToBasket(basket.basket , props.produit , quantity , size)
							}}
				>
			        <i className="fa fa-plus-circle"></i>
			    </button>
            
            
			    {/*BOUTON FAVORIS*/}
			    
		    	{(props.produit.isInFavorite || isInFavorite || (props.produit.id === favorite.id)) ?
		    	<button
					className="button_favoris"
					onClick={(e)=>{
						removeToFavorite(favorite.favorite, props.produit)
						setIsInFavorite(false)
					
					}}
				><i className="fas fa-heart"></i></button> :
		    	<button
		    		className="button_favoris"
					onClick={(e)=>{
						addToFavorite(favorite.favorite, props.produit , isInFavorite)
						setIsInFavorite(true)
					}}
				><i className="fa-regular fa-heart"></i></button> 
				}
				
            </div>
        </li>
    )

}


export default ArticleProduct;