import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
    isLoggedIn: false,
    userToken: null,
    email: null,
    isSignUp: false,
    isLogin: false, 
}

export const signup = createAsyncThunk("/auth/signup", async(userInfo) => {
    const auth = getAuth();
    try{
        const user = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        const data = {
            isLoggedIn: true,
            userToken: user.user.uid,
            email: user.user.email,
            isSignUp: false,
            isLogin: false, 
        }
        return data
    }catch(e){
        console.log(e)
    }
    
})

export const login = createAsyncThunk("/auth/login", async(userInfo) => {
    const auth = getAuth();
    try{
        const user = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        const data = {
            isLoggedIn: true,
            userToken: user.user.uid,
            email: user.user.email,
            isSignUp: false,
            isLogin: false, 
        }
        return data
    }catch(e){
        console.log(e)
    }
})

export const logout = createAsyncThunk("/auth/logout", async() => {
    const auth = getAuth()

    await signOut(auth)

    const data = {
        isLoggedIn: false,
        userToken: "",
        email: "",
        isSignUp: false,
        isLogin: false, 
    }
    return data
})


const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        viewSignUp: (state, action) => {
            state.isLoggedIn = false
            state.isSignUp = true
            state.isLogin = false
        },
        viewLogin: (state, action) => {
            state.isLoggedIn = false
            state.isSignUp = false
            state.isLogin = true
        },
        viewLanding: (state, action) => {
            state.isLoggedIn = false
            state.isSignUp = false
            state.isLogin = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken
            state.email = action.payload.email
            state.isSignUp = action.payload.isSignUp
            state.isLogin = action.payload.isLogin
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken
            state.email = action.payload.email
            state.isSignUp = action.payload.isSignUp
            state.isLogin = action.payload.isLogin
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userToken = action.payload.userToken
            state.email = action.payload.email
            state.isSignUp = action.payload.isSignUp
            state.isLogin = action.payload.isLogin
        })
    }
})

export const {viewLanding, viewLogin, viewSignUp} = authSlice.actions

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn
export const selectUserToken = (state) => state.userAuth.userToken
export const selectEmail = (state) => state.userAuth.email
export const selectIsSignUp = (state) => state.userAuth.isSignUp
export const selectIsLogin = (state) => state.userAuth.isLogin

export default authSlice.reducer