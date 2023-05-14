'use client'
import { useFormik } from "formik"
import { useDispatch } from 'react-redux'
import { signup, viewLanding } from '@/redux/authSlice'
import '../css/shared.css'
import AuthPartial from "../authPartial/page"

export default function Signup(){

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            if(values.password != values.confirmPassword){
                alert("Passwords do not match")
                return
            }
            dispatch(signup({email: values.email, password: values.password}))
        }
    })

    return (
        <div>
            <AuthPartial></AuthPartial>
            <div className="vContainer vCenter">
                <label className="subTitle text">Signup</label>
                <form onSubmit={formik.handleSubmit}>
                    <div className="vContainer">
                        
                        <label className="text formText">Email: </label>
                        <input className="text formText formInput" type='email' id = "email" name = "email" onChange={formik.handleChange} value={formik.values.email} required></input>    
                    
                        <label className="text formText">Password: </label>
                        <input className="text formText formInput" type='password' id = "password" name = "password" onChange={formik.handleChange} value={formik.values.password} required minLength={6}></input>    

                        <label className="text formText">Confirm Password: </label>
                        <input className="text formText formInput" type='password' id = "confirmPassword" name = "confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} required minLength={6}></input>

                        <button className = "navButton formText" type = "submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}