import { checkToken, getToken } from '@/utils/helpers'
import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

const fetchJobs = async url => {
    checkToken()
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    })

    const {
        data,
        total_jobs,
        filtered_jobs,
        non_recruiter_jobs,
        recruiter_jobs,
        today_uploaded_jobs,
        job_status_choice,
        tech_keywords_count_list,
        job_source_count_list,
        total_job_type,
        links,
        detail,
    } = await response.json()

    return {
        status: response.ok ? 'success' : 'error',
        jobsData: data,
        total_jobs: total_jobs?.toString(),
        filtered_jobs: filtered_jobs?.toString(),
        non_recruiter_jobs: non_recruiter_jobs?.toString(),
        today_uploaded_jobs: today_uploaded_jobs?.toString(),
        recruiter_jobs: recruiter_jobs?.toString(),
        job_status_choice,
        tech_keywords_count_list,
        job_source_count_list,
        total_job_type,
        num_pages: links?.num_pages,
        detail,
    }
}

const downloadJobsData = async url => {
    const { data } = await http.get(url)
    return toast.success(data || 'Export in progress, You will be notify through email', { icon: '🎉', duration: 2000 })
}

const updateJobStatus = async (url, status, job) => {
    checkToken()
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status, job }),
    })

    const { detail } = await response.json()

    return { status: response.ok ? 'success' : 'error', detail }
}

const updateRecruiterStatus = async (url, company_name) => {
    checkToken()
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ company_name }),
    })

    const { detail } = await response.json()

    return { status: response.ok ? 'success' : 'error', detail }
}

const generateCoverLetter = async (url, data) => {
    checkToken()
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    })
    const { detail } = await response.json()
    return { status: response.ok ? 'success' : 'error', detail }
}

export { fetchJobs, updateJobStatus, updateRecruiterStatus, generateCoverLetter, downloadJobsData }

export const fetchUserVerticals = link => http.get(link).then(({ data }) => data)

export const fetchJob = link => http.get(link).then(({ data }) => data)

export const applyJob = async (url, { arg: details }) => {
    const { data } = await rawHttp.post(url, details, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return toast.success(data.detail || 'Job Applied successfully', { icon: '🎉', duration: 1000 })
}
