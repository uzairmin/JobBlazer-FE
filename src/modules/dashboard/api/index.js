import { http } from '@utils/http'

export const fetchDashboardData = ({ from_date, to_date, company }) =>
    http
        .get(`api/dashboard/dashboard_analytics/?from_date=${from_date}&to_date=${to_date}&company=${company}`)
        .then(({ data: { leads, statistics, tech_keywords_count_list } }) => ({
            leads,
            statistics,
            tech_jobs: tech_keywords_count_list,
            status: 'success',
        }))

export const fetchJobStats = url => http.get(url).then(({ data }) => data)
