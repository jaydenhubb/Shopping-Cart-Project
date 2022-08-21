import {configureStore} from '@reduxjs/toolkit'
import productReducer, { productsFetch } from "./features/productSlice"

export const store = configureStore({
    reducer:{
        product: productReducer
    }
})

store.dispatch(productsFetch())