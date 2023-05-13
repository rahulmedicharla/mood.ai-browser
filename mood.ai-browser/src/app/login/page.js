'use client'
import { login, viewLanding } from '@/redux/authSlice'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'



export default function Login(){
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(login({email: values.email, password: values.password}))
        }
    })

    const goToLanding = () => {
        dispatch(viewLanding())
    }

    return (
        <div>
            <button onClick={goToLanding}>Go Back</button>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <input type='email' id = "email" name = "email" onChange={formik.handleChange} value={formik.values.email} required></input>
                <label>Password</label>
                <input type='password' id = "password" name = "password" onChange={formik.handleChange} value={formik.values.password} required minLength={6}></input>
             
                <button type = "submit">submit</button>
            </form>
        </div>
    )
}