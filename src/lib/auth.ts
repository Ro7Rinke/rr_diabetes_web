
import Cookies from "js-cookie";
import { fetchUser } from "./user";
import { fetchUserTarget } from "./target";

const PUBLIC_PATHS = ["/signin", "/signup", "/reset-password"];

export function isPublicPath(pathname: string) {
    return PUBLIC_PATHS.includes(pathname);
}

export const fetchToken = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao fazer login");
    }

    const data = await res.json();
    return data.access_token
}

export const setToken = (token: string, isKeepLogged: boolean) => {
    Cookies.set('token', token, {
        expires: isKeepLogged ? 30 : undefined
    })
}

export function getToken(): string | undefined {
    return Cookies.get("token");
}

export function removeToken() {
    Cookies.remove("token");
}

export const getUser = () => {
    const userString = Cookies.get('user')

    if (!userString) throw new Error("Erro ao carregar usuário da sessão")

    return JSON.parse(userString)
}

export function isAuthenticated(): boolean {
    const token = getToken();
    return !!token;
}

export const logout = async () => {
    try {
        removeToken()
        Cookies.remove('user')
    } catch (error) {
        console.error("Erro ao deslogar:", error);
    }
};

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao fazer registro");
    }

    const data = await res.json();

    return data.token
}

export const login = async (email: string, password: string, isKeepLogged: boolean) => {

    const token = await fetchToken(email, password)
    setToken(token, isKeepLogged)

    await fetchUser()
    await fetchUserTarget()

}