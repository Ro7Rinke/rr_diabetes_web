import { HttpMethod, requestAPI } from "./api"
import { getToken } from "./auth"
import Cookies from "js-cookie";

export interface UserData {
    id: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string
}

export const setUser = (user: UserData) => {
    Cookies.set('user', JSON.stringify(user))
}

export const getUser = (): UserData => {
    const dataStrnig = Cookies.get('user')
    if (!dataStrnig) 
        throw new Error('Erro ao carregar informções do usuário')
    return JSON.parse(dataStrnig)
}

export const fetchUser = async () => {
    const endpoint = '/users/me'
    const token = getToken()
    const data = await requestAPI(HttpMethod.GET, endpoint, token)

    setUser(data)
    
    return data
}