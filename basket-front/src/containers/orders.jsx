import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder , setOrder} from "../slices/orderSlice";
import {selectUser } from "../slices/userSlice";
import {GetAllOrders} from "../api/order"


const Order =(props)=>{
    
    const user = useSelector(selectUser);
    const order = useSelector(selectOrder);
    const dispatch = useDispatch();
   
    useEffect (()=>{
     GetAllOrders(user.infos.id)
      .then((response)=>{
          console.log("mes commandes",response)
          dispatch(setOrder(response.result))
      })
      .catch((err)=>console.log(err))
    },[props])
  
return (
    <div> 
        <h2 className="titre">Mes commandes</h2>
       	{order.length > 0 ? <table className="orderTable">
       	    <thead>
				<tr>
    				<th className="order">Numero de commande</th>
    				<th className="prixTot">Prix total</th>
    				<th>Date de la commande</th>
    				<th>Status de commande</th>
    				<th>Details commande</th>
				</tr>
			</thead>
			<tbody>
		    	{order.map((o)=>{
		    	return <tr key={o.id}>
    		    	<td>{o.id}</td>
    				<td>{o.totalAmount} €</td>
    				<td>{new Date(o.creationTimestamp).toLocaleDateString()}</td>
    				<td>{o.status}</td>
    				<td><Link to={"/orderDetail/"+o.id}>Afficher le detail</Link></td>
				</tr>
			})}
			</tbody>
		</table>:<p>Aucune commande</p>
   	    }
    </div>
      )
}

export default Order;

