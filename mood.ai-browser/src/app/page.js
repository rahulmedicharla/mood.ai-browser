'use client'
//firebase imports
import {initializeApp } from 'firebase/app'
import { initializeAuth } from 'firebase/auth'
import { firebaseConfig } from '../../firebaseConfig'

//react-redux imports
import { store } from "../redux/store"
import { Provider } from 'react-redux'

//view imports 
import App from './navigation/page'

const app = initializeApp(firebaseConfig)
initializeAuth(app, {})

export default function Home() {
  
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  )
}
