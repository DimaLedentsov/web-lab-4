import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice.js';

export default configureStore({
    reducer: {
        token: tokenSlice,
    },
})