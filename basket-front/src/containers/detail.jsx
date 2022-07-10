import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useParams } from "react-router";
import {sizeEnfant} from '../helpers/size';
import {sizeFemme} from '../helpers/size';
import {sizeHomme} from '../helpers/size';
import { useDispatch, useSelector } from "react-redux";
import { selectBasket, setModifyBasket } from "../slices/basketSlice";
import { selectProduct, setProduct } from "../slices/productSlice";
import Popup from '../components/popup';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";


const Detail = (props)=>{
    
    const params = useParams();
  
    const product = useSelector(selectProduct);
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState(null)
    const [isPopUp, setIsPopUp] = useState(false)
	const [msg, setMsg] = useState(null);
	
    const [products ,setProduct]= useState(null)
    const [size , setSize] = useState("");
    
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    
    useEffect(()=>{
   	
        let id = params.id
        //récupérer l'index du tableau des produits qui est identique au params id (findIndex)
        let index = product.findIndex(b=>b.id === parseInt(id))
        //si c'est pas moins -1
        if(index !== -1){
            //on récupère le produit qui correspond à cet index et on la stock dans une state
            setProduct(product[index])
        //sinon
        }else{
            //il ne l'a trouvé
            console.log("Produit non trouvé!")
        }    
    }, [props])
    
    //au click ajout dans le panier
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
    
    return ( 
        <div className="detail">
            <h2 className="titre">Détail du produit</h2>
             <Link className ="retour" to="/"><i className="fa fa-arrow-circle-left"></i></Link>
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
            {/*afficher les infos du produit */}
            {products !== null && <div className="detailDescription">
                    <div className="divImage">
					<h3>{products.name}</h3>
					<CloudinaryContext cloudName="dapuyno3v">
			            <div>
			              <Image publicId={products.photo}>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
			         </div>
				
        	<div className="div-desc">
        				<h3>Description:</h3>
    					<p className="description">{products.description}</p>
    					<p><strong>Référence: {products.reference}</strong></p>
    					<span>{products.price}€</span>
    			
    		    <div className="choix">
    		    
    		    {/*condition pour choisir les tailles de chaussure a afficher selon la category*/}
    		    
    			    <select name="option" onChange={(e)=>{
    	                    setSize(e.currentTarget.value);
    	                    }}>
    	        		{products.category_id==1 ?
    							sizeHomme.map((size, index)=>{
    								return (<option key={index} value={size}>
    											Taille:{size}
    										</option>)
    							})
    						: products.category_id==2 ?
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
    	            <p>Quantité:</p>
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
							addToBasket(basket.basket , products , quantity , size)
							}}
				>
			        <i className="fa fa-plus-circle"></i>
			    </button>
    			
                </div>
        </div>
            </div>}
        </div>
    )
}



export default Detail;