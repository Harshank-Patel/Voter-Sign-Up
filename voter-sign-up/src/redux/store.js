import { configureStore } from '@reduxjs/toolkit';
import voterReducer from './voterSlice';  // Make sure this import is correct

const store = configureStore({
    reducer: {
        voter: voterReducer,  // This references the imported voterReducer
    },
});

export default store;