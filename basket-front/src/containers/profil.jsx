import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser , setUser } from "../slices/userSlice";
import { updateOneUser , getOneUser } from "../api/user";
import {Link} from 'react-router-dom';

const Profil = (props)=>{
    
     const user = useSelector(selectUser);
     const dispatch = useDispatch();
     
     const [error , setError]=useState(null)
     const [msg, setMsg] = useState(null);
     const [redirect, setRedirect] = useState(false)
    
     const [firstName, setFirstName]=useState("");
     const [lastName , setLastName]=useState("");
     const [email , setEmail]=useState("");
     const [address , setAddress]=useState("");
     const [zip , setZip]=useState("");
     const [city , setCity]= useState("");
     const [phone , setPhone]=useState("");
     
     
     useEffect(()=>{
         
         //on met à jour nos states pour les champs de formulaire
         setFirstName(user.infos.firstName);
         setLastName(user.infos.lastName);
         setEmail(user.infos.email);
         setAddress(user.infos.address);
         setZip(user.infos.zip);
         setCity(user.infos.city);
         setPhone(user.infos.phone)
         
         
     }, [user])
     
     const onSubmitForm=()=>{
         //création d'un objet datas qui stock les valeurs du form
        let data = {
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    address:address,
                    zip:zip,
                    city:city,
                    phone:phone,
                    }
                    
        updateOneUser(data , user.infos.id)
        .then((response)=>{
            console.log(response)
            if(response.status === 200){
                getOneUser(user.infos.id)
                .then((response)=>{
                 	if(response.status === 200){
                      let myUser=response.user
                      myUser.token=localStorage.getItem("token")   
                      dispatch(setUser(myUser))
                      setMsg("Modification reussie")
                      console.log("modifié !!") 
             	    }
                })
               .catch((err)=>{
                 console.log(err)
             })
            }else{
              setError("Echec modification")
          }
        })
        .catch(err=>console.log(error))
     } 
     
    
    return (
        <div className="user">
            <h2 className="titre">Mon profil : <span>{user.infos.firstName}</span></h2>
            <h3>Modifier mon profil</h3>
        	{msg !== null && <p className="msg">{msg}</p>}
        	{error !== null && <p className="msgError">{error}</p>}
            <form 
                className="form profil" 
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm(e)
                }}>
                <input 
                    type="text" 
                    placeholder="firstName" 
                    defaultValue={user.infos.firstName}
                    onChange={(e)=>{
                    setFirstName(e.currentTarget.value);
                    }}/>
                <input 
                    type="text" 
                    placeholder="lastName" 
                    defaultValue={user.infos.lastName}
                    onChange={(e)=>{
                    setLastName(e.currentTarget.value);
                    }}/>
                <input 
                    type="mail" 
                    placeholder="email" 
                    defaultValue={user.infos.email} 
                    onChange={(e)=>{
                    setEmail(e.currentTarget.value);
                    }} />   
                <input 
                    type="text" 
                    placeholder="address" 
                    defaultValue={user.infos.address}
                    onChange={(e)=>{
                    setAddress(e.currentTarget.value);
                    }}/>
                <input 
                    type="text" 
                    placeholder="zip" 
                    defaultValue={user.infos.zip}
                    onChange={(e)=>{
                    setZip(e.currentTarget.value);
                    }}/>
                <input 
                    type="text" 
                    placeholder="city" 
                    defaultValue={user.infos.city}
                    onChange={(e)=>{
                    setCity(e.currentTarget.value);
                    }}/>
                <input 
                    type="phone" 
                    placeholder="phone" 
                    defaultValue={user.infos.phone}
                    onChange={(e)=>{
                    setPhone(e.currentTarget.value);
                    }}/>
                <input type="submit" value="Modifier" />     
            </form> 
        
            <Link to="/forgot">Modifier mon mot de passe </Link>
       
        </div>
    )
}

export default Profil;