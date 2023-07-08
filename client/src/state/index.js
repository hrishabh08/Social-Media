import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //Set the mode of light/dark
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        //set the login variable
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        //set the logout variable
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        //set the friends
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },

        setnotFriends: (state, action) => {
            if (state.user) {
                state.user.notFriends = action.payload.notFriends;
            } else {
                console.error("user friends non-existent :(");
            }
        },




        //FOR EDITING ALL THE POSTS
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        //FOR EDITING THE POST OF ONE PARTICULAR
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setnotFriends, setPosts, setPost } =
    authSlice.actions;
export default authSlice.reducer;