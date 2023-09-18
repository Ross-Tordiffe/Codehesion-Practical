import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: 'https://edeaf-api-staging.azurewebsites.net',
    timeout: 1000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
    
    // === API requests ===
    
    // --- Authentication ---
    
// call this function to login and fetch token
export const postLogin = async (username, password) => {
    
    const data = {
        grant_type: 'password',
        client_id: 'web-dashboard',
        client_secret: 'SuperSecretPassword',
        scope: 'openid profile role email offline_access adminApi mobileApi',
        username: username,
        password: password
    }

    try {
        const response = await instance.post('/connect/token', qs.stringify(data))
        if (response.status === 200) {
            return response.data.access_token;
        }

        // fetch failed
        console.log('response', response)
        return response.status;

    } catch (error) {
        console.log('error', error)
        return error;
    }
}

// --- User ---

// - Current User -

// call this function to fetch current user data
export const getCurrentUser = async () => {
    
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('Error in getCurrentUser: no token');
        return;
    }
    
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    try {
        const response = await instance.get('/v1/admin/Users/current', config)

        if (response.status === 200) {
            const user = response.data.data
            return user;
        }

        // fetch failed
        console.log('response', response)
        return response.status;
    } catch (error) {
        console.log('error', error)
        return error;
    }
}

// call this function to update current user data
export const updateCurrentUser = async ({name, lastName, email}) => {

    const token = localStorage.getItem('token')
    const user = getCurrentUser();
    
    if (!token) {
        console.log('Error in updateCurrentUser: no token');
        return;
    } else if (!user) {
        console.log('Error in updateCurrentUser: no user');
        return;
    }

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    const data = {
        name: name ? name : user.name,
        lastName: lastName ? lastName : user.lastName,
        email: email ? email : user.email
    }

    try {
        const response = await instance.put('/v1/admin/Users/current', data, config)

        if (response.status === 200) {
            const user = response.data.data
            return user;
        }

        // fetch failed
        console.log('response', response)
        return response.status;
    } catch (error) {
        console.log('error', error)
        return error;
    }
}


    