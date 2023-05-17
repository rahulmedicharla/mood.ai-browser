import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"

const initialState = {
    image_links: [],
    new_images: [],
    openaikey: "",
    shortApiKey: "",
    isProcessing: false
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

export const generateArt = createAsyncThunk("/firestore/generateArt", async(newData) => {
    try{

        const res = await fetch("https://mood-ai-vf3fihroqq-ue.a.run.app/moodai/" + newData.downloadUrl + "/" + newData.apikey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        
        const data = await res.json()
        console.log(data)

        const processed_data = {
            new_images: [],
            isProcessing: false
        }

        if(data["error"] != ""){
            alert(datap["error"] + " Please try again")
        }else{
            processed_data["new_images"] = data["image_results"]
        }

        return processed_data;

    }catch(e){
        console.log(e)
    }
    
})

const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
    reducers: {
        changeIsProcessing: (state, action) => {
            state.isProcessing = action.payload.isProcessing      
        },
    },
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
        builder.addCase(generateArt.fulfilled, (state, action) => {
            state.new_images = action.payload.new_images
            state.isProcessing = action.payload.isProcessing
        })
        
    }
})

export const {changeIsProcessing} = firestoreSlice.actions

export const selectShortApiKey = (state) => state.firestore.shortApiKey
export const selectOpenAiKey = (state) => state.firestore.openaikey
export const selectImageLinks = (state) => state.firestore.image_links
export const selectIsProcessing = (state) => state.firestore.isProcessing
export const selectNewImages = (state) => state.firestore.new_images

export default firestoreSlice.reducer