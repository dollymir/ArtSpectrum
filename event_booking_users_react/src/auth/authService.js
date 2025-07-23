// authService.js
import axios from 'axios';

axios.defaults.withCredentials = true;

const checkSession = async () => {
    try {
        console.log('Logging');
        await axios.post('http://localhost:8000/session');
        return true; // Session is valid
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return false; // Session is not valid
        } else {
            // Handle other errors silently
            return false; // Or you can throw a custom error if needed
        }
    }
};

export default checkSession;
