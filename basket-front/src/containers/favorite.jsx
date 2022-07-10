import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectFavorite, setModifyFavorite, setCleanFavorite} from '../slices/favoriteSlice'
import { selectUser , setUser } from "../slices/userSlice";
import {Navigate} from 'react-router-dom'
import ArticleProduct from '../components/articleProduct'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";


const Favorite = (props)=>{
    
    const favorite = useSelector(selectFavorite)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null);
     
    
	return (
		<div className="page_favoris">
			<h2 className="titre">Favoris</h2>
			{favorite.favorite.length > 0 ? <ul>
	    	{favorite.favorite.map((b)=>{
		    return <ArticleProduct key={b.id} produit={b}/>
	    	})}	
			</ul> : <p>Vous n'avez aucun favoris</p>}
			
		</div>
	)
}

export default Favorite