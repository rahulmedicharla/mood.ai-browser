'use client'
import { logout } from "@/redux/authSlice"
import { useDispatch } from "react-redux"

export default function Dashboard(){
    
    const dispatch = useDispatch()

    const signout = () => {
        dispatch(logout())
    }
    
    return (
        <div>
            <h1>Home</h1>
            <button onClick={signout}>Logout</button>
        </div>
    )
}