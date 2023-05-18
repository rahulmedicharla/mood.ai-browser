import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

        let data = {
            image_links: [],
            openaikey :"",
            shortApiKey: ""
        }
        
        if(docSnap.exists()){
            data['image_links'] = docSnap.data().image_links
            data['openaikey'] = docSnap.data().openaikey
            if(docSnap.data().openaikey.length > 0)
                data['shortApiKey'] = docSnap.data().openaikey.substring(0,6).concat("...")
        }

        return data;

    }catch(e){
        console.log(e)
    }
    
})

export const saveImage = createAsyncThunk("/firestore/saveImage", async(newData) => {

    const storage = getStorage()
    const firestore = getFirestore()
    try{

        //get blob of image
        const encodedURL = encodeURIComponent(newData.url)
        const corsProxy = "https://api.allorigins.win/raw?url=" + encodedURL
        const res = await fetch(corsProxy)
        const blob = await res.blob()

        //save to google storage
        const storageRef = ref(storage, "images/" + newData.userId + "/" + newData.title + ".png")
        await uploadBytes(storageRef, blob, {contentType: 'image/png'})

        //get download url
        const downloadUrl = await getDownloadURL(storageRef)

        //update firestore
        const docRef = doc(firestore, "users", newData.userId)
        const docSnap = await getDoc(docRef)

        //create redux instance
        let returned_data = []

        if(docSnap.exists()){
            let image_links = docSnap.data().image_links
            image_links.push({
                'name': newData.title,
                'url' : downloadUrl
            })
            returned_data = image_links

            await updateDoc(docRef, {
                image_links: image_links
            })
        }
        
        return {
            image_links: returned_data
        };

    }catch(e){
        console.log(e)
    }
    
})

export const generateArt = createAsyncThunk("/firestore/generateArt", async(newData) => {
    const storage = getStorage()
    try{

        const res = await fetch("https://mood-ai-vf3fihroqq-ue.a.run.app/moodai/" + newData.downloadUrl + "/" + newData.apikey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        
        const data = await res.json()

        const processed_data = {
            new_images: [],
            isProcessing: false
        }

        if(data["error"] != ""){
            alert(data["error"] + " Please try again")
        }else{
            processed_data["new_images"] = data["image_results"]
        }

        const storageRef = ref(storage, 'recordings/' + newData.userId + '.mp4')
        await deleteObject(storageRef)


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
        builder.addCase(saveImage.fulfilled,(state,action) => {
            state.image_links = action.payload.image_links
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