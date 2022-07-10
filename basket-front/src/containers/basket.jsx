import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectBasket, setModifyBasket, setCleanBasket} from '../slices/basketSlice'
import { selectUser , setUser } from "../slices/userSlice";
import {saveOneOrder} from '../api/order';
import {Navigate} from 'react-router-dom'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";


const Basket = (props)=>{
	
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [orderId, setOrderId] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null);
     
     // au click on enregistre une commande
	const onClickSaveOrder = ()=>{
	    //si il est connecté
	    if(user.isLogged === true){
	        //on crée un objet data qui récupère l'id de l'user connecté et le panier dans le store
	        let data = {
				user_id: user.infos.id,
				basket: basket.basket
			}
	        // post vers l'api 
	        saveOneOrder(data)
			.then((response)=>{
	            //on demande la redirection et on met à jour l'orderId
	            setOrderId(response.orderId)
	            setRedirect(true)
			})
	    }else{
	    setError("Veuillez vous connecter pour payer votre commande");	
	    }
	}
	
	
    // au click on supprime un article
    const deleteToBasket =(basket , myProduit) =>{
     	let newBasket = basket.filter(b => (b.id + b.size !== myProduit.id + myProduit.size));
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem('basket', lsBasket);
        dispatch(setModifyBasket(newBasket))
     }
     
     
   	// chargement des produits dans le panier
	const listBasket = ()=>{
	    return basket.basket.map((produit)=>{
	        let total = parseInt(produit.price) * parseInt(produit.quantityInCart);
	        return (<tr key={produit.id + produit.size}>
	        	<td className="photo"><CloudinaryContext cloudName="dapuyno3v">
		            <div>
		              <Link to={"/detail/"+ produit.id}><Image publicId={produit.photo}>
		                <Transformation quality="auto" fetchFormat="auto" />
		              </Image></Link>
		            </div>
	            </CloudinaryContext></td>
				<td className="name">{produit.name}</td>
				<td className="tRef">{produit.reference}</td>
				<td>{produit.size}</td>
				<td>{produit.price}€</td>
				<td>{produit.quantityInCart}</td>
				<td className="tTotal">{total}€</td>
				<td>
					<button 
					    className="basket_button"
					    onClick={()=>{
					        deleteToBasket(basket.basket , produit)
					    }}
					>
						<i className="fa fa-trash"></i>
					</button>
				</td>
			</tr>)
	    })
	}
	
	if(redirect) {
	    return <Navigate to={'/payment/'+orderId}/>
	}
    
	return (
		<div>
			<h2 className="titre">Panier</h2>
			{basket.basket.length > 0 ? <table className="basketTable">
			    <thead>
    				<tr>
    					<th>Photo</th>
    					<th>Nom</th>
    					<th className="tRef">Reference</th>
    					<th>Taille</th>
    					<th>Prix</th>
    					<th>Quantité</th>
    					<th className="tTotal">Total</th>
    					<th>Action</th>
    				</tr>
				</thead>
				<tfoot>
				    <tr>
				       	<td className="prixTotal" colSpan="2"><strong>Prix Total:</strong></td>
						<td></td>
						<td></td>
						<td className="prixTotal" colSpan="2"><strong>{basket.totalPrice} €</strong></td>
						<td></td>
				    </tr>
				</tfoot>
			    {basket.basket.length > 0 && <tbody>
						    {listBasket()}
				</tbody>}
				
			</table> : <p>Votre panier est vide</p>}
			{basket.basket.length > 0 &&
				<button
				id="payer"
					onClick={(e)=>{
						onClickSaveOrder();
					}}
				>
					PAYER
				</button>
			}
			{error !== null && <p className="msgError">{error}</p>}
		</div>
	)
}

export default Basket