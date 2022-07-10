import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { forgotPassword } from "../../api/user";

const Forgot = (props) => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  
  const onSubmitForm = () => {
      let data={
      	email:email.toLowerCase()
      }  
      forgotPassword(data)
      .then((response)=>{
          console.log("envoyer !!")
          setRedirect({redirect: true})
      })
      .catch(err=>console.log(err))
  }
  
  if(redirect) {
      return <Navigate to="/login" />
  }
    
  return (
    <div className="formulaire-mobile">
        <h2>Entrer votre email </h2> 
  			{error !== null && <p className="errorMsg">{error}</p>}
  					<form className="forgotPassword " onSubmit={(e)=>{
                e.preventDefault();
                onSubmitForm()
            }}>
                <label><i className="fas fa-lock"></i></label>            
                <input type="mail" 
                    name="email"
                    placeholder="email"
                    onChange={(e)=>{
                      setEmail(e.currentTarget.value);
                    }} />
                            
                <input
                  className="btnNewPassword"
                  type="submit"
                  value="Envoyer nouveau mot de passe"
                />
            </form>  
    </div>
  )
}

export default Forgot;