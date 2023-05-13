'use client'
import { useFormik } from "formik"
import { useDispatch } from 'react-redux'
import { signup, viewLanding } from '@/redux/authSlice'

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

    const goToLanding = () =>{
        dispatch(viewLanding())
    }

    return (
        <div>
            <button onClick={goToLanding}>Go Back</button>
            <h1>Signup</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <input type='email' id = "email" name = "email" onChange={formik.handleChange} value={formik.values.email} required></input>
                <label>Password</label>
                <input type='password' id = "password" name = "password" onChange={formik.handleChange} value={formik.values.password} required minLength={6}></input>
                <label>ConfirmPassword</label>
                <input type='password' id = "confirmPassword" name = "confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} required minLength={6}></input>

                <button type = "submit">submit</button>
            </form>
        </div>
    )
}