import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectBasket, setCleanBasket} from '../slices/basketSlice'
import emoji from "../assets/images/emoji.gif"

const Success = (props)=>{
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        window.localStorage.removeItem('basket');
        dispatch(setCleanBasket())
    },[])
    
    return (
            <div className="success">
                <h2>Bravo !!</h2>
                <img src={emoji} alt="felicitation"/>
                <p className="paragrapheSuccess">La commande a été effectuée avec succès.</p>
                <p><Link to="/" className="successRetour">Retour à l'accueil</Link></p>
                <p><Link to ="/orders">Voir mes commandes</Link></p>
            </div>
        )
}

export default Success;