import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import basketReducer from "./basketSlice";
import orderReducer from "./orderSlice";
import favoriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    basket:basketReducer,
    order:orderReducer,
    favorite:favoriteReducer,
  },
});

export default store;
