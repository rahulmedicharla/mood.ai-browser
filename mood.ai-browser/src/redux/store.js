import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import firestoreSlice from "./firestoreSlice";

export const store = configureStore({
    reducer:{
        userAuth: authSlice,
        firestore: firestoreSlice
    }
})