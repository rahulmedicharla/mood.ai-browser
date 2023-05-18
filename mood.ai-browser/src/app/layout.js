'use client'
import './css/globals.css'
import { Inter } from 'next/font/google'

//react -redux
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

//firebase imports
import {initializeApp } from 'firebase/app'
import { initializeAuth, browserSessionPersistence } from 'firebase/auth'


const inter = Inter({ subsets: ['latin'] })


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


export const metadata = {
  title: 'Mood AI',
  description: 'Store memories as AI generated art',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
        {children}
        </Provider>
        </body>
    </html>
  )
}
