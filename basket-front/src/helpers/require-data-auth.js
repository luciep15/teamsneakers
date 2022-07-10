import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { setProduct } from "../slices/productSlice";
import { getAllProduct } from "../api/product";

//HOC de controle des data et de la sécurité
const RequireAuth = (props) => {
    
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    
    const params = useParams();
    
    const Child = props.child;
    // gestion des state
    const [redirect, setRedirect] = useState(false);
    
 // au chargement de chaque comtainers
   useEffect(() => {

        //récupération du token dans le storage
        let token=window.localStorage.getItem("token")
         //si il ne trouve pas de token et que la route est restreinte
        if(token === null && props.auth){
             //on supprime le token du storage
            window.localStorage.removeItem('token')
            //on demande la redirection
            setRedirect(true)
        //sinon
        }else{
            //si l'utilisateur n'est pas connecté dans le store
             if(user.isLogged === false){
                //requête axios vers checkToken 
                 axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
            	.then((response)=>{
                    console.log(response)
                    //si le status de la réponse n'est pas 200
                    if(response.data.status !== 200){
                        //si sur notre route on a une props auth
                        if(props.auth){
                            //on supprime le token du storage
                            window.localStorage.removeItem('token')
                            //on demande la redirection
                            setRedirect(true)
                           }
                        //sinon
                         }else{   
                            //on crée notre objet user avec la réponse de l'axios
                            let myUser=response.data.user
                            //on ajoute une propriété token 
                            myUser.token=token;
                            //envoi dans le store vers l'action pour connecter l'utilisateur (dispatch)
                            dispatch(setUser(myUser));
                         } 
            	    })
                         //catch la requête axios de checkToken a echoué
                    .catch((err)=>{
                    setRedirect(true)
                    console.log(err ,"checktoken a échoué" )
                   })
            }
      }
      
    }, [])  
    if (redirect) {
        return <Navigate to="/login" />;
    }
    return <Child {...props} params={params} />;

}

export default RequireAuth;