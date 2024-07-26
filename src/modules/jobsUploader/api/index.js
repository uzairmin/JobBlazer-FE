import { toast } from 'react-hot-toast'

import { http, rawHttp } from '@utils/http'
import { checkToken, getToken } from '@utils/helpers'

const uploadJobs = async (url, formData) => {
    checkToken()
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })

    const { detail } = await response.json()
    return { status: response.ok ? 'success' : 'error', detail }
}

export const fetchManualJobs = url => http.get(url).then(({ data }) => ({ jobs: data, status: 'success' }))

export const saveJob = (url, { arg: job }) => rawHttp.post(url, job).then(({ data }) => toast.success(data.detail))

export const fetchTechStacks = url =>
    http.get(url).then(({ data }) => ({ techStacks: data.keywords, status: 'success' }))

export default uploadJobs

export const updateJob = (url, { arg: job }) =>
    rawHttp.put(url, job).then(({ data }) => toast.success(data.detail || 'Job is updated successfully'))

export const toggleMarkAsExpired = id =>
    http
        .get(`api/job_portal/job_expired_at/${id}/`)
        .then(({ data }) => toast.success(data.detail || 'Job is updated successfully'))

export const fetchExpiredJobs = url =>
    http.get(url).then(({ data }) => ({
        jobs: data?.data,
        next: data?.links?.next,
        prev: data?.links?.previous,
        pages: data?.links?.num_pages,
    }))
