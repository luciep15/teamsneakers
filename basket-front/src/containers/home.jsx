import React, { useState, useEffect } from "react";
import Slider from '../components/slider'
import image3 from '../assets/images/slider3.jpg'
import image2 from '../assets/images/slider2.jpg'
import image1 from '../assets/images/slider1.jpg'

import { getAllProduct } from "../api/product";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../slices/productSlice";

const Home = (props)=>{
  
    const dispatch = useDispatch();

    useEffect(() => {
    //récupération de tous les produits (fonction api)
        getAllProduct()
        .then((response)=>{
             //envoi dans le store vers l'action pour mettre à jour les produits (dispatch)
            dispatch(setProduct(response.result));
        })
           //catch
         .catch(err=>console.log(err));   
    
    },[props])

    return (
        <div>
            <h2 className="home titre">Notre boutique</h2>
            <p className="presentation">Sur notre boutique en ligne, nous vous proposons un très grand choix de <span>Sneakers</span> de <span>toutes marques</span> , de <span>très haute qualité</span> pour <span>homme, femme </span>et <span>enfant</span>.</p>
            <Slider/> 
            <img className="imagemobile" src={image1} alt="basket1"/>
            <div className="imagetab">
               <img src={image2} alt="basket2"/>
               <img src={image3} alt="basket3"/>
               <img src={image1} alt="basket1"/>
            </div>
        </div>
    );
 
}

export default Home;
