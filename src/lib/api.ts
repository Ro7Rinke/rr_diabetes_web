export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}

export enum ContentType {
    JSON = 'application/json',
    FORM = 'application/x-www-form-urlencoded',
    MULTIPART = 'multipart/form-data',
    TEXT = 'text/plain',
    HTML = 'text/html',
    XML = 'application/xml',
    PDF = 'application/pdf',
    JPEG = 'image/jpeg',
    PNG = 'image/png',
}

export const requestAPI = async (
    method: HttpMethod, 
    endpoint: string, 
    token?: string, 
    body?: any, 
    contentType: ContentType = ContentType.JSON
) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
    let headers: Record<string, string> = {}

    if (contentType) headers['Content-Type'] = contentType
    if (token) headers['Authorization'] = `Bearer ${token}`

    let config: RequestInit = {
        method,
        headers,
    }

    if (body) config.body = body

    const res = await fetch(url, config)

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao realizar a requisição");
    }
    // const data = res.json()
    const data = res.headers.get('content-type')?.includes(ContentType.JSON) 
        ? res.json() 
        : res.text

    return data
}
