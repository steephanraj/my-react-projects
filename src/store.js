import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import reviewReducer from "./slices/reviewSlice";




export default configureStore({
    reducer: {
        cart: cartReducer,
        products: postReducer,
        reviews: reviewReducer,
    }
});