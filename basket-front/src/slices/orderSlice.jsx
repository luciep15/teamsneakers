import { createSlice } from "@reduxjs/toolkit";

const initialState = {
order:[],
orderDetail:[],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload; // update the state with the action commin in named "payload
    },
    setOrderDetail:(state , action)=>{
      state.orderDetail=action.payload;
    }
    
  }
});

export const { setOrder , setOrderDetail } = orderSlice.actions;

// selectors
export const selectOrder = (state) => state.order.order;
export const selectOrderDetail = (state) => state.order.orderDetail;

export default orderSlice.reducer;
