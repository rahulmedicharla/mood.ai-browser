'use client'

import { selectEmail, selectIsLoggedIn, selectIsLogin, selectIsSignUp, selectUserToken } from "@/redux/authSlice"
import { useSelector } from "react-redux"
import Landing from "../landing/page"
import Dashboard from "../dashboard/page"
import Login from "../login/page"
import Signup from "../signup/page"

export default function App(){
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const userToken = useSelector(selectUserToken)
    const email = useSelector(selectEmail)
    const isSignup = useSelector(selectIsSignUp)
    const isLogin = useSelector(selectIsLogin)
    
    return isLoggedIn == false ? (
        isSignup == true ? (<Signup></Signup>):(
            isLogin == true ? (<Login></Login>) : (<Landing></Landing>)
        )
    ):
        (<Dashboard></Dashboard>) 
          
}