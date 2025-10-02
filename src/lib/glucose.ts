import { HttpMethod, requestAPI } from "./api"
import { getToken } from "./auth"

export enum RecordContext {
  FASTING = 'fasting', // jejum
  POST_MEAL = 'post_meal', // pós refeição
  PRE_MEAL = 'pre_meal', // pré refeição
  RANDOM = 'random', // qualquer momento
}

export interface GlucoseRecord {
    value: number,
    measuredAt: Date,
    obs?: string,
    context: RecordContext
}

export const createGlucoseRecord = async (glucoseRecord: GlucoseRecord) => {
    const endpoint = '/glucose/record'
    const token = getToken()
    const body = JSON.stringify(glucoseRecord)
    return await requestAPI(HttpMethod.POST, endpoint, token, body)
}