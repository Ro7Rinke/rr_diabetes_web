import Cookies from "js-cookie";

export const clearAllCookies = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatValue = (value: number, isDot: boolean = true): string => {
    const str = Number(value).toFixed(2)
    if (isDot) return str
    else return str.replace('.', ',')
}