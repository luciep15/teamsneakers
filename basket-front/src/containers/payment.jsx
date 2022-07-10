import React, {useState, useEffect} from 'react';
import CheckoutForm from '../components/checkout-form'
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
//élément va installer l'environnement de paiement sécurisé de stripe, et elementConsumer va brancher la récéption des infos de la carte à l'environnement de paiement

const Payment = (props)=>{
    
    const stripePromise = loadStripe('pk_test_51Kk6qpFPK4LLYsZ2JD1217rZWjbyCafuOKLFZmz2qYYBVjSzidlX3MJkeKjHd79Usw4dD2kR0Hi9Z13aMkGot0es00Mii121IC');
    
    return (
        <div>
            <h2 className="titre">Paiement</h2>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
    			    {({stripe, elements}) => (
    			      <CheckoutForm orderId={props.params.orderId} stripe={stripe} elements={elements} />
    			    )}
			    </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default Payment;