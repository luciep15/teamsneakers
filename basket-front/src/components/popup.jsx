import React, {useState, useEffect}from 'react';
import emoji from "../assets/images/emoji.gif"
import {Link} from 'react-router-dom';

const Popup = (props)=>{
    
    return (
        <div>
            {props.isPopUp && <div className="popUp">
                <p 
                    className="closePopUp"
                    onClick={(e)=>{
                        props.onClickClose()
                    }}
                >X</p>
                <h2>Félicitation</h2>
                <img src={emoji} alt="felicitation"/>
				<p>{props.msg}</p>
				<p className="msgError">{props.error}</p>
				<button 
				    className="closePopUp"
				    onClick={(e)=>{
                        props.onClickClose()
                    }}
				>
    				Retour aux achats
				</button>
					<button 
				    className="closePopUp"
				    onClick={(e)=>{
                        props.onClickClose()
                    }}
				>
    				<Link to="/basket">Voir le panier</Link>
				</button>
             
            </div>}
        </div>
    )

}

export default Popup;