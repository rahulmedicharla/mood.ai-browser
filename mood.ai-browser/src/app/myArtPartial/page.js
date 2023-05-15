'use client'
import { logout, viewIsMyArt } from "@/redux/authSlice"
import { useDispatch } from "react-redux"
import '../css/shared.css'

export default function MyArtPartial({email}){
    
    const dispatch = useDispatch()

    const goToHome = () => {
        dispatch(viewIsMyArt({
            isMyArt: false
        }))
    }

    const signout = () => {
        dispatch(logout())
    }
    
    return (
        <div className="homeNav">
            <button className="navButton" onClick={signout}>Logout</button>
            <button className="navButton" onClick = {goToHome}>Home</button>
            <label className="text header">Welcome, {email}</label>
        </div>
    )
}