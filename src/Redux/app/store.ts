import { configureStore } from '@reduxjs/toolkit';
import productStateReducer from "../features/productSlice"
import cartStateReducer from "../features/productCartSlice";


export const store = configureStore({
    reducer: {
        productState: productStateReducer,
        cartState: cartStateReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch