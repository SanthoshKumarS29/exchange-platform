import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchMarkets } from "../../services/server/market/marketAPi"

export const loadMarkets = createAsyncThunk('markets/loadMarkets', 
    async(_, { rejectWithValue }) => {
        try{
            const response = await fetchMarkets();

            if(!response.success || !Array.isArray(response.markets)){
                return rejectWithValue('The server returned Invalid market data.')
            }

            return response.markets;
        } catch(error){
            return rejectWithValue(error.response?.data?.message || 'Unable to load markets. Please try again')
        }
    }
)

const marketSlice = createSlice({
    name: 'markets',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMarkets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadMarkets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadMarkets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Something went wrong'
            })
    }
})

export default marketSlice.reducer;