import { configureStore } from '@reduxjs/toolkit';
import voterReducer from './voterSlice';

const store = configureStore({
    reducer: {
        voters: voterReducer,  // Make sure it's 'voters' to match the slice name
    },
});

export default store;