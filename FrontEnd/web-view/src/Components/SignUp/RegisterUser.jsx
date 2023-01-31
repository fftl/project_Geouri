import axios from "axios";
import { signup } from "../../Redux/modules/user";

export function RegisterUser(data) {
  const request = axios
    .post("http://localhost:3000/signup", data)
    .then((response) => response.data);

  return {
    type: signup,
    payload: request,
  };
}
