'use client'
import { viewLogin, viewSignUp } from '@/redux/authSlice'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import '../css/shared.css'

export default function Landing(){

    const dispatch = useDispatch()

    const goToSignup = () => {
        dispatch(viewSignUp())
    }

    const goToLogin = () => {
        dispatch(viewLogin())
    }

    return (
        <div className = "vContainer vCenter">
            <label className = "title text landing">mood.ai</label>
            <label className = "subTitle text landing">Capture memories and moments as AI generated art</label>
            <div className='landing hContainer'>
                <button className = "button" onClick={goToSignup}>Signup</button>
                <button className = "button" onClick={goToLogin}>Login</button>
            </div>            
        </div>
    )
}