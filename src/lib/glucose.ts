import { HttpMethod, requestAPI } from "./api"
import { getToken } from "./auth"

export enum RecordContext {
  FASTING = 'fasting', // jejum
  POST_MEAL = 'post_meal', // pós refeição
  PRE_MEAL = 'pre_meal', // pré refeição
  RANDOM = 'random', // qualquer momento
}

export interface GlucoseRecord {
    id: string,
    value: number,
    measuredAt: Date,
    obs?: string,
    context: RecordContext
}
export interface CreateGlucoseRecord {
    value: number,
    measuredAt: Date,
    obs?: string,
    context: RecordContext
}

export interface GlucoseAverage {
    average: number,
    count: number,
    interval: number,
    from: Date,
    to: Date,
    records: Array<GlucoseRecord>
}

export const getRecordContextLabel = (recordContext: RecordContext, isShort: boolean = false): string => {
    switch(recordContext){
        case RecordContext.FASTING:
            return isShort ? 'Jejum' : 'Jejum'
        case RecordContext.POST_MEAL:
            return isShort ? 'Pós' : 'Pós Refeição'
        case RecordContext.PRE_MEAL:
            return isShort ? 'Pré' : 'Pré Refeição'
        case RecordContext.RANDOM:
            return isShort ? 'Qualquer' : 'Qualquer Momento'
    }
}

export const createGlucoseRecord = async (glucoseRecord: CreateGlucoseRecord) => {
    const endpoint = '/glucose/record'
    const token = getToken()
    const body = JSON.stringify(glucoseRecord)
    return await requestAPI(HttpMethod.POST, endpoint, token, body)
}

export const fetchGlucoseRecords = async (): Promise<GlucoseRecord[]> => {
    const endpoint = '/glucose/record'
    const token = getToken()
    return await requestAPI(HttpMethod.GET, endpoint, token)
}

export const fetchGlucoseAverage = async (): Promise<GlucoseAverage> => {
    const endpoint = '/glucose/average'
    const token = getToken()
    return await requestAPI(HttpMethod.GET, endpoint, token)
}