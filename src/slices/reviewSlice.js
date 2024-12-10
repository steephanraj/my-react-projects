import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        return response.data;  // This will contain the product data
    }
);


// Async action to post a review for a product
export const postReview = createAsyncThunk(
    'reviews/postReview',
    async ({ product, reviewData }, { rejectWithValue }) => {
        try {
            const existingReviewIndex = product.reviews.findIndex(
                (review) => review.id === reviewData.id // Assuming user field identifies the review
            );

            if (existingReviewIndex !== -1) {
                // Update the existing review
                product.reviews[existingReviewIndex] = {
                    ...product.reviews[existingReviewIndex],
                    ...reviewData,
                };
            } else {
                // Add new review if it doesn't exist
                product.reviews.push(reviewData);
            }

            console.log('response.data', product);
            // Make a POST request to submit the review
            const response = await axios.put(`http://localhost:3000/products/${product.id}`, reviewData);
            console.log('response.data', response.data);
            return response.data; // Return the new review data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],   // Array of reviews for the product
        loading: false,
        error: null,
    },
    reducers: {
        // Optionally add reducers to manipulate reviews locally if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews = action.payload;

            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postReview.pending, (state) => {
                state.loading = true;  // Set loading to true while posting
                state.error = null;     // Clear previous errors
            })
            .addCase(postReview.fulfilled, (state, action) => {
                state.loading = false;   // Set loading to false
                state.reviews.push(action.payload); // Add new review to the array
            })
            .addCase(postReview.rejected, (state, action) => {
                state.loading = false;   // Set loading to false
                state.error = action.payload; // Set error message
            });
    },
});

// Export actions (if needed) and reducer
export default reviewSlice.reducer;