import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cartItems:[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state, action){
            const index = state.cartItems.findIndex((item)=> item.id === action.payload.id);
            if(index >=0) {
                state.cartItems[index].amount +=1;
            } else {
                const prod = {...action.payload, amount:1}
                state.cartItems.push(prod)
            }
        },
        // removeItem(state, action){
            
        // }
    }
})


export const {addToCart} =cartSlice.actions
export default cartSlice.reducer