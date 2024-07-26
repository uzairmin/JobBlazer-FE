import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import router from '@router'

import App from '@/App'

import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Toaster />
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </React.StrictMode>
)
