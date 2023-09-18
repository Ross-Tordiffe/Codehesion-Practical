import axios from "axios";

export default axios.create({
    baseURL: 'https://edeaf-api-staging.azurewebsites.net',
    timeout: 1000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});