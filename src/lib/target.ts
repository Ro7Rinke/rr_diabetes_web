import { HttpMethod, requestAPI } from "./api"
import { getToken } from "./auth"
import Cookies from 'js-cookie'

export interface TargetData {
    value: number,
    tolerance: number,
    interval: number
}

export const setTarget = (target: TargetData) => {
    Cookies.set('target', JSON.stringify(target))
}

export const getTarget = (): TargetData | undefined => {
    const dataString = Cookies.get('target')
    if (dataString) return JSON.parse(dataString)
}

export const fetchUserTarget = async (): Promise<TargetData> => {
    const endpoint = '/targets'
    const token = getToken()

    const data = await requestAPI(HttpMethod.GET, endpoint, token)

    setTarget(data)

    return data
}