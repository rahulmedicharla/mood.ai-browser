import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"

const initialState = {
    video_links: [],
}

const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
})

export const selectVideoLinks = (state) => state.firestore.video_links

export default firestoreSlice.reducer