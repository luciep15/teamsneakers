import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../slices/userSlice'
import {selectBasket, setModifyBasket, setCleanBasket} from '../slices/basketSlice'
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {Navigate} from 'react-router-dom';
import {paymentOrders, validatePayment} from '../api/order';

const CheckoutForm = (props) =>{
    
    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    const [redirectBasket, setRedirectBasket] = useState(false)
    const [redirectSuccess, setRedirectSuccess] = useState(false)
    
    const removeToBasket = (basket, myProduct) =>{
        let newBasket = basket.filter(b => b.id !== myProduct.id);
        
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem('basket', lsBasket);
        
        dispatch(setModifyBasket(newBasket))
    }
    // lors de l'envoie du formulaire
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        
        let data = {
            email: user.infos.email,
            basket: basket.basket,
            orderId:props.orderId       }
        
        //gestion du paiement via stripe
        const paymentAuth = await paymentOrders(data)
        
        if (paymentAuth.status === 500){
            removeToBasket(basket.basket, paymentAuth.product)
            setRedirectBasket(true)
        }
        
        const secret = paymentAuth.client_secret
        
        const payment = await props.stripe.confirmCardPayment(secret, {
                              payment_method: {
                                card: props.elements.getElement(CardElement),
                                billing_details: {
                                  email: user.infos.email
                                },
                              },
                            });
        // gestion en cas d'erreur            
        if (payment.error) {
            console.log("echec paiment", payment.error.message);
        } else {
            // si le paiement est un succes
            if (payment.paymentIntent.status === 'succeeded') {
                console.log('Money is in the bank!');
                let data = {
                    basket: basket.basket,
                    orderId: props.orderId,
                    status: "payed",
                    user_id: user.infos.id
                }
                validatePayment(data)
                .then((response)=>{
                    setRedirectSuccess(true)
                })
                .catch(err=>console.log(err))
            }
        }
    }
    
    if(redirectBasket){
        return <Navigate to="/basket"/>
    }
    
    if(redirectSuccess){
        return <Navigate to="/success"/>
    }
    
    return (
          <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <button id="buttonPayment" type="submit" disabled={!props.stripe}>
                Payer
              </button>
          </form>
    );
}

export default CheckoutForm;