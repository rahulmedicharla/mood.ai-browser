import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"

const initialState = {
    image_links: [],
    openaikey: "",
    shortApiKey: "",
}


export const saveOpenAiKey = createAsyncThunk("/firestore/saveKey", async(newData) => {
    const firestore = getFirestore()
    try{
        const docRef = doc(firestore, "users", newData.userToken)

        await updateDoc(docRef, {
            openaikey: newData.openaikey
        })
        
        const data = {
            openaikey: newData.openaikey,
            shortApiKey: newData.openaikey.substring(0, 6).concat("...")
        }
        return data;

    }catch(e){
        console.log(e)
    }
    
})


export const loadData = createAsyncThunk("/firestore/loadData", async(userId) => {
    const firestore = getFirestore()
    try{
        const docRef = doc(firestore, "users", userId)
        const docSnap = await getDoc(docRef)

        const data = {
            image_links: [],
            openaikey :"",
            shortApiKey: ""
        }
        
        if(docSnap.exists()){
            data.image_links = docSnap.data().image_links
            data.openaikey = docSnap.data().openaikey
            if(docSnap.data().openaikey.length > 0)
                data.shortApiKey = docSnap.data().openaikey.substring(0,6).concat("...")
        }
        
        return data;

    }catch(e){
        console.log(e)
    }
    
})

const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.image_links = action.payload.image_links;
            state.openaikey = action.payload.openaikey
            state.shortApiKey = action.payload.shortApiKey
        })
        builder.addCase(saveOpenAiKey.fulfilled, (state, action) => {
            state.openaikey = action.payload.openaikey
            state.shortApiKey = action.payload.shortApiKey
        })
        
    }
})

export const selectShortApiKey = (state) => state.firestore.shortApiKey
export const selectOpenAiKey = (state) => state.firestore.openaikey
export const selectImageLinks = (state) => state.firestore.image_links

export default firestoreSlice.reducer