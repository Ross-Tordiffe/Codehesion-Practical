import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './assets/styles/main.css'
import Root from './routes/root.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
