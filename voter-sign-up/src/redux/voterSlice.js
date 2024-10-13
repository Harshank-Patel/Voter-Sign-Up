import { createSlice } from '@reduxjs/toolkit';

const voterSlice = createSlice({
    name: 'voter',
    initialState: {
        voters: [],
    },
    reducers: {
        addVoter: (state, action) => {
            // Adds the entire voter object (with name, email, etc.) to the state
            console.log(state, "state object");
            console.log(action, "action object");
            state.voters.push(action.payload);
        },
    },
});

export const { addVoter } = voterSlice.actions;
export default voterSlice.reducer;