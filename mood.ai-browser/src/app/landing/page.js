'use client'
import { viewLogin, viewSignUp } from '@/redux/authSlice'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

export default function Landing(){

    const dispatch = useDispatch()

    const goToSignup = () => {
        dispatch(viewSignUp())
    }

    const goToLogin = () => {
        dispatch(viewLogin())
    }

    return (
        <div>
            <h1> Landing</h1>
            <button onClick={goToSignup}>Signup</button>
            <button onClick={goToLogin}>Login</button>            
        </div>
    )
}