import { createSlice } from "@reduxjs/toolkit";

//on récupère les favoris dans le localStorage du navigateur que l'on stock dans une variable lsbasket
let lsFavorite = JSON.parse(window.localStorage.getItem('favorite'));
//si lsFavorite est null (il ne l'a pas trouvé)
if(lsFavorite === null){
    //ls favorite sera un tableau vide
 lsFavorite=[]
 
}

const initialState = {
  favorite: lsFavorite,
};



export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setModifyFavorite: (state, action) => {
      state.favorite = action.payload; // update the state with the action commin in named "payload"
     
    },
    setCleanFavorite: (state) => {
      state.favorite = [];
    },
  },
});

export const { setModifyFavorite , setCleanFavorite } = favoriteSlice.actions;

// selectors
export const selectFavorite = (state) => state.favorite;


export default favoriteSlice.reducer;
