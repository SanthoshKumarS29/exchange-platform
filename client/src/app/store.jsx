import { configureStore } from "@reduxjs/toolkit";
import marketReducer from '../features/market/marketSlice';

export const Store = configureStore({
    reducer: {
        markets: marketReducer,
    },
})