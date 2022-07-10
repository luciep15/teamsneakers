import React, {useState, useEffect} from 'react';

import {Navigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { loginUser } from "../../api/user";
import {Link} from 'react-router-dom';

const Login = (props)=>{
    
    const dispatch = useDispatch();
  
    //ici toutes nos states pour récup les valeurs du form
    const [msg, setMsg] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    
    const [email , setEmail]= useState("");
    const [password , setPassword] = useState("");
    
    const onSubmitForm = () => {
        let data = {
            email:email.toLowerCase(),
            password:password,
        }
        // envoie le formulaire vers l'api
        loginUser(data)
        .then((response)=>{
            console.log(response)
            setError("Votre email ou votre mot de passe est incorrect");
            //si la reponse est status 200
            if(response.status ===200){
                // si tout se passe bien enregistrement du token dans e localstorage
                 window.localStorage.setItem('token', response.token)
                 let user = response.user;
                 user.token = response.token;
                 dispatch(setUser(user));
	            //on redirige vers l'accueil
	             setRedirect({redirect: true})
	             console.log("Connecté !!")
            }
        })
        .catch((err)=>{
            console.log(err)
            })  
    }
    if(redirect) {
	        return <Navigate to="/" />
    }

	return (
	   <div className="formulaire-mobile">
        <h2 className="titre">Se connecter</h2> 
	    {error !== null && <p className="msgError">{error}</p>}
    	<form className="form" onSubmit={(e)=>{
            e.preventDefault();
            onSubmitForm()
            }}>
           
            <input type="mail" name="email" placeholder="Votre Mail" 
                onChange={(e)=>{
                setEmail(e.currentTarget.value);
                }} />
            <input type="password" name="password" placeholder="Votre Mot de passe"
                onChange={(e)=>{
                setPassword(e.currentTarget.value);
                }}/>
         
            <input type="submit" value="Se connecter" />
        </form>
            
            <Link to="/forgot" className="password">Mot de passe oublié ?</Link>
        </div>)
}
	

export default Login;
