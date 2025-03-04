// authSlice.js
import { createAction, createSlice } from '@reduxjs/toolkit';
// Define the initial state for  slice
const initialState = {
    token: null,
    loading: false,
    error: null,
    user: {},
    refreshToken: null,


    authUser: {},
    authError: null,
    authLoading: false,




    getPost: {},
    getPostLoadingError: null,
    getPostLoading: false,
};

export const loginCreator = createAction('Login_CREATOR');
export const loginCreatorType = loginCreator().type;

export const authCreator = createAction('AUTH_CREATOR');
export const authCreatorType = authCreator().type;



export const refreshTokenCreator = createAction('REFRESH_TOKEN__CREATOR');
export const refreshTokenCreatortype = refreshTokenCreator().type;


export const getAllPostCreator = createAction('GET_ALL_POST_CREATOR');
export const getAllPostCreatorType = getAllPostCreator().type;


const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState, // Initial state
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        loggedInUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
        },

        authLoading: (state, action) => {
            state.authLoading = action.payload;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.authLoading = false;
            state.authError = action.payload;
        },
        authUser: (state, action) => {
            state.authUser = action.payload;
            state.authLoading = false;
        },

        refreshTokenRequest: (state) => {
            state.loading = true;
        },
        refreshTokenSuccess: (state, action) => {
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.loading = false;
        },
        refreshTokenFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        setAllPost: (state, action) => {
            state.getPost = action.payload;
            state.getPostLoading = false;
        },

        setAllPostLoading: (state, action) => {
            state.getPostLoading = true;
        },
        setAllPostFailure: (state, action) => {
            state.getPostLoading = false;
            state.getPostLoadingError = action.payload;
        },

        // add before this line, 

    },
});

export const sliceActions = authSlice.actions;
export default authSlice.reducer;