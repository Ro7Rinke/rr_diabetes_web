
import Cookies from "js-cookie";

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

      return data.token
}

export const setToken = (token: string, isKeepLogged: boolean) => {
    Cookies.set('token', token, {
        expires: isKeepLogged ? 30 : undefined
    })
}

export function getToken(): string | undefined {
  return Cookies.get("token");
}

export function removeToken(){
  Cookies.remove("token");
}

export function isAuthenticated(): boolean {
  const token = getToken();
  return !!token;
}

export const logout = async () => {
  try {
    removeToken()
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    // 2. Se o token estiver em cookie HTTP-only, chame a API para limpar
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    //   method: "POST",
    //   credentials: "include",
    // });

  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
};