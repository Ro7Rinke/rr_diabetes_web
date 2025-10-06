import { BadgeColor } from "@/components/ui/badge/Badge"
import { HttpMethod, requestAPI } from "./api"
import { getToken } from "./auth"
import Cookies from 'js-cookie'
import { ArrowDownIcon, ArrowUpIcon, CheckLineIcon } from "@/icons";

export interface TargetData {
    value: number,
    tolerance: number,
    interval: number
}

export enum StatusWithinRange {
    SUPER_LOW = 'super_low',
    LOW = 'low',
    OK_LOW = 'ok_low',
    EXACTLY = 'exactly',
    OK_HIGH = 'ok_high',
    HIGH = 'high',
    SUPER_HIGH = 'super_high',
    NONE = 'none'
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

export const getStatusWithinRange = (value: number): StatusWithinRange => {
    const target = getTarget()
    if (!target || !target?.value)
        return StatusWithinRange.NONE

    const goal = target.value
    const tolerance = target.tolerance

    const min = goal - tolerance
    const max = goal + tolerance
    const superMin = min - tolerance
    const superMax = max + tolerance

    if (value == goal)
        return StatusWithinRange.EXACTLY

    if (value < goal)
        return value > min 
            ? StatusWithinRange.OK_LOW
            : value > superMin 
                ? StatusWithinRange.LOW
                : StatusWithinRange.SUPER_LOW


    if (value > goal)
        return value < max
            ? StatusWithinRange.OK_HIGH
            : value < superMax
                ? StatusWithinRange.HIGH
                : StatusWithinRange.SUPER_HIGH 

    return StatusWithinRange.NONE

}

export const getStatusRangeBadgeColor = (statusWithinRange: StatusWithinRange): BadgeColor => {
    if (statusWithinRange == StatusWithinRange.EXACTLY || statusWithinRange == StatusWithinRange.OK_LOW || statusWithinRange == StatusWithinRange.OK_HIGH)
        return 'success'
    if (statusWithinRange == StatusWithinRange.LOW || statusWithinRange == StatusWithinRange.HIGH)
        return 'warning'
    if (statusWithinRange == StatusWithinRange.SUPER_LOW || statusWithinRange == StatusWithinRange.SUPER_HIGH)
        return 'error'
    if (statusWithinRange == StatusWithinRange.NONE)
        return 'info'

    return 'info'
}

export const getStatusRangeIcon = (statusWithinRange: StatusWithinRange) => {
    const checkStatus = [
        StatusWithinRange.EXACTLY,
        StatusWithinRange.NONE
    ]
    const downStatus = [
        StatusWithinRange.LOW,
        StatusWithinRange.SUPER_LOW
    ]
    const upStatus = [
        StatusWithinRange.HIGH,
        StatusWithinRange.SUPER_HIGH
    ]
    if (checkStatus.includes(statusWithinRange))
        return CheckLineIcon
    if (downStatus.includes(statusWithinRange))
        return ArrowDownIcon
    if (upStatus.includes(statusWithinRange))
        return ArrowUpIcon

    return CheckLineIcon
}

export const getStatusRangeText = (statusWithinRange: StatusWithinRange): string => {
    switch(statusWithinRange){
        case StatusWithinRange.SUPER_LOW:
            return 'Muito Baixo'
        case StatusWithinRange.LOW:
            return 'Baixo'
        case StatusWithinRange.OK_LOW:
            return 'Ótimo'
        case StatusWithinRange.EXACTLY:
            return 'Perfeito'
        case StatusWithinRange.OK_HIGH:
            return 'Ótimo'
        case StatusWithinRange.HIGH:
            return 'Alto'
        case StatusWithinRange.SUPER_HIGH:
            return 'Muito Alto'
        case StatusWithinRange.NONE:
            return '-'
        default:
            return '-'
    }
}