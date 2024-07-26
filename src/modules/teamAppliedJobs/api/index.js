import { http } from '@utils/http'

import { toast } from 'react-hot-toast'

export const fetchTeamAppliedJobs = url =>
    http.get(url).then(({ data }) => ({
        jobs: data?.data,
        total: data?.links?.num_pages,
        next: data?.links?.next,
        prev: data?.links?.previous,
        job_source_analytics: data?.job_source_analytics,
        job_type_analytics: data?.job_type_analytics,
        filtered_jobs: data?.filtered_jobs,
        last_12_hours_count: data?.last_12_hours_count,
        team_members: data?.team_members,
        status: 'success',
    }))

export const fetchTeamAppliedJobsPerHour = url =>
    http
        .get(url)
        .then(({ data }) => ({ results: data?.data, dates: data?.dates, min: data?.min_count, max: data?.max_count }))
export const downloadFilteredJobs = url =>
    http
        .get(url)
        .then(({ data }) =>
            toast.success(data || 'Your request has been submitted successflly please visit logs in a while')
        )

export const fetchDropdownVals = url => http.get(url).then(({ data }) => ({ data, status: 'success' }))
export const fetchLogs = url => http.get(url).then(({ data }) => ({ results: data.results, status: 'success' }))
