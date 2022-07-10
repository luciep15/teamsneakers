import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { selectOrder , setOrder} from "../slices/orderSlice";
import { selectOrderDetail , setOrderDetail} from "../slices/orderSlice";
import {selectUser } from "../slices/userSlice";
import {GetDetailOrders , GetOneOrder} from '../api/order';
import { useParams } from "react-router";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

const OrderDetail = (props)=>{
	const params = useParams();
	const user = useSelector(selectUser);
    const order = useSelector(selectOrder);
    const orderDetail = useSelector(selectOrderDetail)
	const dispatch = useDispatch();
	const id= props.params.orderId
   
   	// DETAILS

	 useEffect (()=>{
	    GetOneOrder(id)
	        .then((response)=>{
	        	console.log("ma commande",response)
	        	dispatch(setOrder(response.result))
	        	GetDetailOrders(id)
	        	.then((response)=>{
	        		console.log("detail",response)
	        	    dispatch(setOrderDetail(response.result))
	        	})
	        	.catch(err=>console.log(err))
	      })
	        .catch(err=>console.log(err))
    }, [setOrderDetail ,id])
   
	return (
		<div>
		    <h2 className="titre">Details commande : <span> {id} </span></h2>
		    <Link className="retour" to="/orders"><i className="fa fa-arrow-circle-left"></i></Link>
		    <table className="orderTable">
	       	    <thead>
					<tr>
						<th>Photo</th>
						<th>Nom du produit</th>
						<th className="tRef">Reference</th>
						<th>Quantité</th>
						<th>Taille</th>
						<th>Prix unitaire</th>
						<th className="tTotal">Prix total</th>
					</tr>
				</thead>
				<tfoot>
				    <tr>
				       	<td className="prixTotal" colSpan="2"><strong>Prix Total Commande:</strong></td>
						<td></td>
						<td></td>
						<td className="prixTotal" colSpan="2"><strong>{order.totalAmount} €</strong></td>
						<td></td>
				    </tr>
				</tfoot>
				<tbody>
					{orderDetail.map((d)=>{
			    	return <tr key={d.id}>
				    	<td className="photo"><CloudinaryContext cloudName="dapuyno3v">
				            <div>
				               <Link to={"/detail/"+ d.product_id}><Image publicId={d.photo}>
				                <Transformation quality="auto" fetchFormat="auto" />
				              </Image></Link>
				            </div>
				         </CloudinaryContext></td>
				    	<td className="name">{d.name}</td>
				    	<td className="tRef">{d.reference}</td>
						<td>{d.quantity}</td>
						<td>{d.size}</td>
						<td>{d.price} €</td>
						<td className="tTotal">{d.total} €</td>
					</tr>
				})}
				</tbody>
		    </table> 
		</div>
	)
}

export default OrderDetail