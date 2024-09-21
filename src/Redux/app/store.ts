import { configureStore } from '@reduxjs/toolkit';
import productStateReducer from "../features/productSlice"


export const store = configureStore({
    reducer: {
        productState: productStateReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch