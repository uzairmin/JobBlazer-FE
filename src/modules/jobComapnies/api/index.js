import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchJobCompanies = url =>
    http.get(url).then(({ data }) => ({
        companies: data?.data,
        pages: data?.links?.num_pages,
        counts: data?.job_companies_stats,
    }))

export const changeJobCompanyStatus = (url, { arg: jobCompany }) =>
    rawHttp.post(url, jobCompany).then(({ data }) => toast.success(data.detail || 'Job Company blocked successfully'))
