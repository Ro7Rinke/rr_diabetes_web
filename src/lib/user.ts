import { HttpMethod, requestAPI } from "./api"
import { getToken } from "./auth"
import Cookies from "js-cookie";

export const fetchUser = async () => {
    const endpoint = '/users/me'
    const token = getToken()
    const data = requestAPI(HttpMethod.GET, endpoint, token)

    Cookies.set('user', JSON.stringify(data))
    
    return data
}