import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 products:[],
 newProduct:[],
 hommeProduct:[],
 femmeProduct:[],
 enfantProduct:[]
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload; // update the state with the action commin in named "payload
    },
    setNewProduct:(state ,action)=>{
      state.newProduct=action.payload;
    },
    setHommeProduct:(state ,action)=>{
      state.hommeProduct=action.payload;
    }, 
    setFemmeProduct:(state ,action)=>{
      state.femmeProduct=action.payload;
    }, 
    setEnfantProduct:(state ,action)=>{
      state.enfantProduct=action.payload;
    },
  },
});

export const { setProduct , setNewProduct , setHommeProduct , setFemmeProduct , setEnfantProduct } = productSlice.actions;

// selectors
export const selectProduct = (state) => state.product.products;
export const selectNewProduct = (state)=> state.product.newProduct;
export const selectHommeProduct = (state)=> state.product.hommeProduct;
export const selectFemmeProduct = (state)=> state.product.femmeProduct;
export const selectEnfantProduct = (state)=> state.product.enfantProduct;

export default productSlice.reducer;
