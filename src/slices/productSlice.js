import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    productsData: [],
    loading: false,
}

export const getProductsData = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await axios.get(`http://localhost:3000/products`);
        return response.data;
    });

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsData.fulfilled, (state, action) => {
                state.loading = false;
                state.productsData = action.payload;
            })
            .addCase(getProductsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
})
export const postReducer = ProductSlice.reducer;




