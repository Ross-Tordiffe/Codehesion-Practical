import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage.jsx'
import Root from './routes/root.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './assets/styles/main.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
