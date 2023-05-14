'use client'
import { viewLanding } from "@/redux/authSlice"
import { useDispatch } from "react-redux"
import '../css/shared.css'

export default function AuthPartial(){
    
    const dispatch = useDispatch()

    const goToLanding = () => {
        dispatch(viewLanding())
    }
    
    return (
        <div className="authNav">
            <button className="navButton" onClick={goToLanding}>Go Back</button>
        </div>
    )
}