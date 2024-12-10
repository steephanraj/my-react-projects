import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        list: []
    },
    reducers: {
        addItem: (state, { payload }) => {

            state.list = [...state.list, { ...payload, count: payload.count }];
        },
        removeItem: (state, { payload }) => {
            const index = state.list.findIndex((product) => product.id === payload.id);
            state.list = [
                ...state.list.slice(0, index),
                ...state.list.slice(index + 1),
            ];
        },
        modifyItem: (state, { payload }) => {
            const index = state.list.findIndex((product) => product.id === payload.id);
            state.list = [
                ...state.list.slice(0, index),
                { ...state.list[index], count: payload.count },
                ...state.list.slice(index + 1),
            ];

        },
        clearCart: (state) => {
            return {
                ...state,
                list: [],
            }

        }
    },
});
export const { addItem, removeItem, modifyItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;