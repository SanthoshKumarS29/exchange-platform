import { configureStore } from "@reduxjs/toolkit";
import marketReducer from '../features/market/marketSlice';
import orderReducer from '../features/order/OrderSlice'

export const Store = configureStore({
    reducer: {
        markets: marketReducer,
        orders: orderReducer,
    },
})