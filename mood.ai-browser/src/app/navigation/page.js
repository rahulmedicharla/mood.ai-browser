'use client'

import { selectEmail, selectIsLoggedIn, selectIsLogin, selectIsMyArt, selectIsSignUp, selectUserToken } from "@/redux/authSlice"
import { useSelector } from "react-redux"
import Landing from "../landing/page"
import Dashboard from "../dashboard/page"
import Login from "../login/page"
import Signup from "../signup/page"
import MyArt from "../myArt/page"
import { selectImageLinks, selectIsProcessing, selectNewImages, selectOpenAiKey, selectShortApiKey } from "@/redux/firestoreSlice"

export default function App(){
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const userToken = useSelector(selectUserToken)
    const email = useSelector(selectEmail)
    const isSignup = useSelector(selectIsSignUp)
    const isLogin = useSelector(selectIsLogin)
    const isMyArt = useSelector(selectIsMyArt)

    const image_links = useSelector(selectImageLinks)
    const new_images = useSelector(selectNewImages)
    const openaikey = useSelector(selectOpenAiKey)
    const shortApiKey = useSelector(selectShortApiKey)
    const isProcessing = useSelector(selectIsProcessing)
    
    return isLoggedIn == false ? (
        isSignup == true ? (<Signup></Signup>):(
            isLogin == true ? (<Login></Login>) : (<Landing></Landing>)
        )
    ):(
        isMyArt == true ? (<MyArt image_links={image_links} email = {email}></MyArt>) : 
            (<Dashboard userToken={userToken} email={email} new_images={new_images} openaikey={openaikey} shortApiKey={shortApiKey} isProcessing={isProcessing}></Dashboard>)
    ) 
          
}