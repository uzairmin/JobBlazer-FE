import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchAppliedJobs = url =>
    http.get(url).then(({ data }) => ({
        jobs: data?.data,
        total: data?.links?.num_pages,
        next: data?.links?.next,
        prev: data?.links?.previous,
    }))

export const fetchStatusPhases = url => http.get(url).then(({ data }) => data)

export const convertToLead = (url, { arg: lead }) =>
    rawHttp
        .post(url, lead)
        .then(({ data }) => toast.success(data.detail || 'Applied Job is converted to Lead successfully'))

export const fetchSelectedCandidates = url =>
    http.get(url).then(({ data }) => ({
        candidates: data?.results,
        skills: data?.skills,
        designations: data?.designations,
        regions: data?.regions,
        total: data?.count,
        pages: data?.num_pages,
    }))
