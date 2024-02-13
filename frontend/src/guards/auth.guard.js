import axios from "axios";

export default async function AuthGuard(token) {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth`, {
            token: token
        });
        console.log('Auth Guard Success');
        return true;
    } catch(err){
        console.log('Auth Guard Error');
        return false;
    }
}