import { http } from '@utils/http'

export const fetchErrorLogs = url =>
    http.get(url).then(({ data }) => ({ errors: data.results, links: data.links, status: 'success' }))
