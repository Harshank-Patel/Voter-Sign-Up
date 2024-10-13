import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    voterList: [],  // Ensure voterList exists in the initial state
};

const voterSlice = createSlice({
    name: 'voters',
    initialState,
    reducers: {
        addVoter: (state, action) => {
            state.voterList.push(action.payload);
        },
    },
});

export const { addVoter } = voterSlice.actions;
export default voterSlice.reducer;