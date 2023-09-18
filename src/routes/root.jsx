import Home from '../pages/Home.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryView from '../components/CategoryView.jsx'

export default function Root() {

    const token = localStorage.getItem('token')
    const hosturl = 'https://edeaf-api-staging.azurewebsites.net'

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Home hosturl={hosturl}/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}