import axios from "axios"
import { REGISTER_USER } from "../../Redux/modules/user_sign"


export function RegisterUser(data) {

 
    const request = axios.post('http://localhost:3000/signup', data)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



