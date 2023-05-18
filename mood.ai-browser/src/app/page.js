'use client'
//firebase imports
import {initializeApp } from 'firebase/app'
import { initializeAuth, browserSessionPersistence } from 'firebase/auth'

//react-redux imports
import { store } from "../redux/store"
import { Provider } from 'react-redux'

//view imports 
import App from './navigation/page'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)
initializeAuth(app, {
  persistence: browserSessionPersistence
})

export default function Home() {
  
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  )
}
