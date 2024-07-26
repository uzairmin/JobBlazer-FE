import toast from 'react-hot-toast'

import { http } from '@utils/http'

export const fetchJobs = url =>
    http.get(url).then(({ data }) => ({ jobs: data?.results, next: data?.next, prev: data?.previous }))

export const fetchJobFilters = url =>
    http.get(url).then(({ data }) => ({
        techStacks: data?.tech_keywords_count_list,
        jobSources: data?.job_source_count_list,
        jobTypes: data?.total_job_type,
        stats: {
            total: data?.total_jobs || 0,
            recruited: data?.recruiter_jobs || 0,
            nonRecruited: data?.non_recruiter_jobs || 0,
            filtered: data?.filtered_jobs || 0,
            todayUploaded: data?.today_uploaded_jobs || 0,
        },
    }))

export const downloadJobsData = async url => {
    url += '&download=true'
    debugger
    const { data } = await http.get(url)
    return toast.success(data || 'Export in progress, You will be notify through email', { icon: '🎉', duration: 2000 })
}

export const fetchJobDetails = url => http.get(url).then(({ data }) => data)
