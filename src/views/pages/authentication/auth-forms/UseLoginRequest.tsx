import Api from "api/apiConfig";
import { toast } from "react-toastify";

interface ILoginRequest {
    dni: string;
    password: string;
}


export const loginRequest = async (dni, password) => {
    try {

        const response = await Api.post("/login", {
            dni,
            password
        });
        const data = await response.data;
        toast("Logged in successfully");
        return data;
    } catch (error) {
        console.error(error);
    }
};
