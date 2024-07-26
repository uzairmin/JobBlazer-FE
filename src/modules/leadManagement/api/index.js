import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchStatuses = url =>
    http.get(url).then(({ data }) => ({ statuses: data?.results, total: data?.count, pages: data?.num_pages }))

export const saveStatus = (url, { arg: status }) => {
    if (status?.id) {
        return rawHttp
            .put(url, status)
            .then(({ data }) => toast.success(data.detail || 'Status is updated successfully'))
    }
    return rawHttp.post(url, status).then(({ data }) => toast.success(data.detail || 'Status is created successfully'))
}

export const fetchStatusList = url => http.get(url).then(({ data }) => data)

export const fetchCompanyStatuses = url =>
    http.get(url).then(({ data }) => ({ statuses: data?.results, total: data?.count, pages: data?.num_pages }))

export const saveCompanyStatus = (url, { arg: { status_list } }) =>
    rawHttp
        .post(url, { status_list: status_list.map(({ value }) => value) })
        .then(({ data }) => toast.success(data.detail || 'Status are added successfully'))

export const fetchPhases = url =>
    http.get(url).then(({ data }) => ({ phases: data?.results, total: data?.count, pages: data?.num_pages }))

export const fetchCompanyStatusList = url => http.get(url).then(({ data }) => data)

export const savePhase = (url, { arg: phase }) => {
    if (phase?.id) {
        return rawHttp.put(url, phase).then(({ data }) => toast.success(data.detail || 'Phase is updated successfully'))
    }
    return rawHttp.post(url, phase).then(({ data }) => toast.success(data.detail || 'Phase is created successfully'))
}

export const fetchLeads = url =>
    http.get(url).then(({ data }) => ({
        leads: data?.results,
        total: data?.count,
        pages: data?.num_pages,
        teams: data?.team ?? [],
        members: data?.members ?? [],
        stacks: data?.tech_stack ?? [],
        candidates: data?.candidates ?? [],
    }))

export const fetchLeadsData = url =>
    http.get(url).then(({ data }) => ({
        leads: data?.results ?? [],
        total: data?.count,
        pages: data?.num_pages,
    }))

export const fetchLeadFilters = url =>
    http.get(url).then(({ data }) => ({
        teams: data?.team ?? [],
        members: data?.members ?? [],
        stacks: data?.tech_stack ?? [],
        candidates: data?.candidates ?? [],
    }))

export const changeLeadStatus = (url, { arg: status }) =>
    rawHttp.put(url, status).then(({ data }) => toast.success(data.detail || 'Lead Status is updated successfully'))

export const fetchLead = url => http.get(url).then(({ data }) => data)

export const saveNote = (url, { arg: note }) => {
    if (note?.id) {
        return rawHttp
            .put(url, note, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(({ data }) => toast.success(data.detail || 'Note is updated successfully'))
    }
    return rawHttp
        .post(url, note, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(({ data }) => toast.success(data.detail || 'Note is created successfully'))
}

export const fetchNotes = url =>
    http.get(url).then(({ data }) => ({ notes: data?.results, total: data?.count, pages: data?.num_pages }))

export const fetchDesignations = url =>
    http.get(url).then(({ data }) => ({ designations: data?.results, total: data?.count, pages: data?.num_pages }))

export const saveDesignation = (url, { arg: designation }) => {
    if (designation?.id) {
        return rawHttp
            .put(url, designation)
            .then(({ data }) => toast.success(data.detail || 'Designation is updated successfully'))
    }
    return rawHttp
        .post(url, designation)
        .then(({ data }) => toast.success(data.detail || 'Designation is created successfully'))
}

export const fetchCandidates = url =>
    http.get(url).then(({ data }) => ({
        candidates: data?.results,
        total: data?.count,
        pages: data?.num_pages,
        all_regions: data.regions,
    }))

export const saveCandidate = (url, { arg: candidate }) => {
    if (candidate?.id) {
        return rawHttp
            .put(url, { ...candidate })
            .then(({ data }) => toast.success(data.detail || 'Candidate is updated successfully'))
    }
    return rawHttp
        .post(url, candidate)
        .then(({ data }) => toast.success(data.detail || 'Candidate is created successfully'))
}

export const saveTeam = (url, { arg: team }) => {
    if (team?.id) {
        return rawHttp
            .put(url, { ...team })
            .then(({ data }) => toast.success(data.detail || 'Team updated successfully'))
    }
    return rawHttp.post(url, team).then(({ data }) => toast.success(data.detail || 'Team is created successfully'))
}

export const fetchCandidatesAndCompanies = url =>
    http.get(url).then(({ data }) => ({ candidates: data?.candidates, companies: data?.companies }))

export const fetchTeamsCandidatesAndCompanies = url =>
    http
        .get(url)
        .then(({ data }) => ({ teams: data?.teams, candidates: data?.exposed_candidates, companies: data?.companies }))

export const assignCandidate = (url, { arg: candidate }) =>
    rawHttp
        .put(url, candidate)
        .then(({ data }) => toast.success(data.detail || 'Candidate is assigned / reassigned successfully'))

export const changeCandidateStatus = (url, { arg: candidate }) =>
    rawHttp.post(url, candidate).then(({ data }) => toast.success(data.detail))

export const fetchMyProfile = url =>
    http.get(url).then(({ data }) => ({ candidates: data?.candidate, regions: data?.all_regions }))

export const fetchMyProjects = url => http.get(url).then(({ data }) => ({ data }))

export const saveCandidateProjects = async (url, { arg: candidate }) => {
    const { data } = await rawHttp.put(url, candidate)
    return toast.success(data.detail || 'Candidate is updated successfully')
}
