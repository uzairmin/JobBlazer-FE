import { http } from '@utils/http'

export const fetchAnalytics = url => http.get(url).then(({ data }) => data)
