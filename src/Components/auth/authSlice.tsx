import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: null,
    user_email: null,
    first_name: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user_id = action.payload.user_id;
            state.user_email = action.payload.user_email;
            state.first_name = action.payload.first_name;
        },
        clearUser: (state) => {
            state.user_id = null;
            state.user_email = null;
            state.first_name = null;
        }
    }
})

const { reducer, actions } = authSlice;

export const { setUser, clearUser } = actions;
export default reducer;