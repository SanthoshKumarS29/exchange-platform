import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderApi, getOrderApi } from '../../services/server/order/OrderApi';

export const createOrder = createAsyncThunk('orders/createOrder', 
    async (orderData, { rejectWithValue  }) => {
        try{
            const response = await createOrderApi(orderData);
            if(!response.success){
                return rejectWithValue('Failed to place order')
            }
            return response.order;
        } catch(error){
            return rejectWithValue(error.message || 'Something went wrong')
        }
    }
)

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', 
    async(__dirname, { rejectWithValue }) => {
        try{
            const response = await getOrderApi();

            if(!response.success){
                return rejectWithValue('Failed to fetch order')
            }

            return response.orders

        } catch(error){
            return rejectWithValue(
                error.message || 'Something went wrong'
            );
        }
    }
)

const orderSlice = createSlice({
    name: 'orders',

    initialState: {
        items: [],
        createStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        fetchStatus: 'idle',
        error: null,
        successMessage: null
    },

    reducers: {
        clearOrderMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },

    extraReducers: (builder) => {
        builder

        // create order
        .addCase(createOrder.pending, (state) => {
            state.createStatus = 'loading'
            state.error = null;
            state.successMessage = null;
        })

        .addCase(createOrder.fulfilled, (state, action) => {
            state.createStatus = 'successded';

            state.items.unshift(action.payload) //.unshift() is an array method that adds one or more new elements to the very beginning (index 0) of an array
            state.successMessage = 'Order placed Successfully';
        })

        .addCase(createOrder.rejected, (state, action) => {
            state.createStatus = 'failed';
            state.error = action.payload || 'Failed to place Order';
        })

        // Fetch my Orders
        .addCase(fetchMyOrders.pending, (state) => {
                state.fetchStatus = 'loading';
                state.error = null;
            })

        .addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.fetchStatus = 'succeeded';
            state.items = action.payload;
        })

        .addCase(fetchMyOrders.rejected, (state, action) => {
            state.fetchStatus = 'failed';
            state.error = action.payload || 'Failed to fetch orders';
        });
    }
})

export const { clearOrderMessages } = orderSlice.actions;

export default orderSlice.reducer;