import { createSlice } from "@reduxjs/toolkit";

//on récupère le panier dans le localStorage du navigateur que l'on stock dans une variable lsbasket
let lsBasket = JSON.parse(window.localStorage.getItem('basket'));
//si lsbasket est null (il ne l'a pas trouvé)
if(lsBasket === null){
    //ls basket sera un tableau vide
 lsBasket=[]
 
}
//initialisation d'un prix total (appel de la fonction)
let totalPrice=calculateTotalAmount(lsBasket)

const initialState = {
  basket: lsBasket,
  totalPrice: totalPrice,
};

function calculateTotalAmount(basket){
    //on initialise un prix total à zero
    let total=0
    //on boucle sur le panier
    for ( let i=0 ; i< basket.length ; i++){
        //on ajoute au total le prix de chaque produit multiplié par sa quantitée
      total += parseInt(basket[i].quantityInCart) * parseInt(basket[i].price);
    }
    //on retourne le prix total
    return total
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setModifyBasket: (state, action) => {
      let totalPrice = parseInt(calculateTotalAmount(action.payload)); 
      state.basket = action.payload; // update the state with the action commin in named "payload"
      state.totalPrice = totalPrice;
    },
    setCleanBasket: (state) => {
      state.basket = [];
      state.totalPrice = 0;
    },
  },
});

export const { setModifyBasket , setCleanBasket } = basketSlice.actions;

// selectors
export const selectBasket = (state) => state.basket;


export default basketSlice.reducer;
