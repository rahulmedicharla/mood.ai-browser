'use client'
import { logout, viewIsMyArt } from "@/redux/authSlice"
import { useDispatch } from "react-redux"
import '../css/shared.css'

export default function HomePartial({email}){
    
    const dispatch = useDispatch()

    const goToMyArt = () => {
        dispatch(viewIsMyArt({
            isMyArt: true
        }))
    }

    const signout = () => {
        dispatch(logout())
    }
    
    return (
        <div className="homeNav">
            <button className="navButton" onClick={signout}>Logout</button>
            <button className="navButton" onClick = {goToMyArt}>My Art</button>
            <label className="text header">Welcome, {email}</label>
        </div>
    )
}