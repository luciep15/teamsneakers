
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import logo2 from '../assets/images/logo2.png'
import { useSelector } from "react-redux";
import { selectUser , setUser } from "../slices/userSlice";
import {selectBasket} from "../slices/basketSlice";
import {selectFavorite} from "../slices/favoriteSlice";
import { useDispatch } from "react-redux";



const Header =(props)=>{
 
const user = useSelector(selectUser);
const basket = useSelector(selectBasket);
const favorite = useSelector(selectFavorite)
const dispatch = useDispatch();

const toggle=()=> {
  const hamburger = document.querySelector(".hamburger-lines")
  const navMenu = document.querySelector(".menu-items")

hamburger.addEventListener("click", ()=>{
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})
}

const togglelink = ()=>{
   const hamburger = document.querySelector(".hamburger-lines")
   const navMenu = document.querySelector(".menu-items")

  document.querySelectorAll(".linkMenu").forEach(n=>n.addEventListener("click", ()=>{
  hamburger.classList.remove("active")
  navMenu.classList.remove("active")
}))
}


console.log(user)
console.log(basket)
console.log(favorite)

  	return (
   		<div className="header">
  		    <nav>
                <div className="navbar">
                    <div className="container nav-container">
                        <div className="hamburger-lines"  
                        onClick={()=>{
                        toggle()}}>
                            <span className="line line1"></span>
                            <span className="line line2"></span>
                            <span className="line line3"></span>
                        </div>  
                        <div className="logo">
                            <Link to="/"><img src={logo2} alt="logo"/><h1>Team sneakers !!</h1></Link>
                        </div>
                        <div className="menu-items" 
                        onClick={()=>{
                        togglelink()}}>
                          	{user.isLogged ? <div className="menu_deroulant">
                               	<Link to="/profil" className="linkMenu" id="user">{user.infos.firstName}</Link>
                               	<Link to="/orders" className="linkMenu">Commande</Link>
                         		<Link to="/logout" className="linkMenu">Déconnexion</Link>
                                  {user.infos.role === "admin" && <Link to="/admin" className="linkMenu">Admin</Link>}
                          	</div>:<div className="menu_deroulant">
                               	<Link to="/register" className="linkMenu">S'enregistrer</Link>
                               	<Link to="/login" className="linkMenu">Se connecter</Link>
                               </div>}
                               <Link to="/favorite" className="linkMenu favoris"><i className="fas fa-heart"></i> Favoris  {favorite.favorite.length > 0 && <span className="mobile_favorite">{favorite.favorite.length}</span> }</Link>
                          	<nav className="navigation">
                                <Link to="/new" className="linkMenu">Nouveautés</Link>
                                <Link to="/femme" className="linkMenu">Femme</Link>
                                <Link to="/homme" className="linkMenu">Homme</Link>
                                <Link to="/enfant" className="linkMenu">Enfants</Link>
                           </nav>
                        </div>
                    </div>	
                </div>
       		</nav>
         <p className="banniere"><em>Livraison offerte à partir de 65€ d'achat !</em></p>
         <div className="picture">
             <div className="panier1">
                 <Link to="/basket"><i className="fas fa-shopping-cart"></i>     
                 {basket.basket.length > 0 && <span className="span-basket">{basket.basket.length}</span> }</Link>
             </div>
         </div>
         
         
        <div className="menu_web">
             <nav className="connect">
                  	<div className="menu">
                      	{user.isLogged ? <div className="deroulant">
                       	<Link to="/profil" id="user">{user.infos.firstName}</Link>
                       	<Link to="/orders">Commande</Link>
 						<Link to="/logout">Déconnexion</Link>
  					    {user.infos.role === "admin" && <Link to="/admin">Admin</Link>}
  						</div>:<div className="deroulant">
                       	<Link to="/register">S'enregistrer</Link>
                       	<Link to="/login">Se connecter</Link>
                   	    </div>}
                   	    <Link to="/favorite" className="favoris"><i className="fas fa-heart"></i> Favoris   {favorite.favorite.length > 0 && <span className="span-basket">{favorite.favorite.length}</span> }</Link>
                       	<div className="panier2">
                  		    <Link to="/basket"><i className="fas fa-shopping-cart"></i> Panier   {basket.basket.length > 0 && <span className="span-basket">{basket.basket.length}</span> }</Link>
                       	</div>
                  	</div>
       		 </nav>
             <p className="banniere"><em>Livraison offerte à partir de 65€ d'achat !</em></p>
             <div className="pict">
             <Link to ="/" ><h1>Team sneakers !!</h1></Link>
             </div>
             <nav className="navigation">
                <Link to="/"><img src={logo2} alt="logo"/></Link>
                <Link to="/new">Nouveautés</Link>
                <Link to="/femme">Femme</Link>
                <Link to="/homme">Homme</Link>
                <Link to="/enfant">Enfants</Link>
            </nav>
            <p className="separateur"></p>
        </div>
    </div>
  )

}
 	
export default Header;


