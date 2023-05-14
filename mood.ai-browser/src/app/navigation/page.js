'use client'

import { selectEmail, selectIsLoggedIn, selectIsLogin, selectIsMyArt, selectIsSignUp, selectUserToken } from "@/redux/authSlice"
import { useSelector } from "react-redux"
import Landing from "../landing/page"
import Dashboard from "../dashboard/page"
import Login from "../login/page"
import Signup from "../signup/page"
import MyArt from "../myArt/page"

export default function App(){
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const userToken = useSelector(selectUserToken)
    const email = useSelector(selectEmail)
    const isSignup = useSelector(selectIsSignUp)
    const isLogin = useSelector(selectIsLogin)
    const isMyArt = useSelector(selectIsMyArt)
    
    return isLoggedIn == false ? (
        isSignup == true ? (<Signup></Signup>):(
            isLogin == true ? (<Login></Login>) : (<Landing></Landing>)
        )
    ):(
        isMyArt == true ? (<MyArt></MyArt>) : 
            (<Dashboard userToken={userToken} email={email}></Dashboard>)
    ) 
          
}