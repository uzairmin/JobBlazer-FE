import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchPseudos = url => http.get(url).then(({ data }) => ({ pseudos: data.results, status: 'success' }))

export const savePseudo = async (url, { arg: pseudo }) => {
    if (pseudo?.id) {
        const { data } = await rawHttp.put(url, pseudo)
        return toast.success(data.detail || 'Pseudo updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, pseudo)
    return toast.success(data_1.detail || 'Pseudo created successfully')
}

export const saveVertical = async (url, { arg: vertical }) => {
    const { data } = await rawHttp.post(url, vertical)
    return toast.success(data.detail || 'Vertical created successfully')
}

export const fetchBasicInfo = url => http.get(url).then(({ data }) => data)

export const updateBasicInfo = async (url, { arg: pseudo }) => {
    const { data } = await rawHttp.put(url, pseudo)
    return toast.success(data.detail || 'Pseudo updated successfully')
}

export const fetchSkills = url => http.get(url).then(({ data }) => data.results)

export const saveSkill = async (url, { arg: skill }) => {
    if (skill?.id) {
        const { data } = await rawHttp.put(url, skill)
        return toast.success(data.detail || 'Skill updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, skill)
    return toast.success(data_1.detail || 'Skill created successfully')
}

export const fetchExperiences = url => http.get(url).then(({ data }) => data.results)

export const saveExperience = async (url, { arg: experience }) => {
    if (experience?.id) {
        const { data } = await rawHttp.put(url, experience)
        return toast.success(data.detail || 'Experience updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, experience)
    return toast.success(data_1.detail || 'Experience created successfully')
}

export const fetchEducations = url => http.get(url).then(({ data }) => data.results)

export const saveEducation = async (url, { arg: education }) => {
    if (education?.id) {
        const { data } = await rawHttp.put(url, education)
        return toast.success(data.detail || 'Education updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, education)
    return toast.success(data_1.detail || 'Education created successfully')
}

export const fetchLanguages = url => http.get(url).then(({ data }) => data.results)

export const saveLanguage = async (url, { arg: language }) => {
    if (language?.id) {
        const { data } = await rawHttp.put(url, language)
        return toast.success(data.detail || 'Language updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, language)
    return toast.success(data_1.detail || 'Language created successfully')
}

export const fetchLinks = url => http.get(url).then(({ data }) => data.results)

export const saveLink = async (url, { arg: link }) => {
    if (link?.id) {
        const { data } = await rawHttp.put(url, link)
        return toast.success(data.detail || 'Link updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, link)
    return toast.success(data_1.detail || 'Link created successfully')
}

export const fetchOtherSections = url => http.get(url).then(({ data }) => data.results)

export const saveOtherSection = async (url, { arg: other }) => {
    if (other?.id) {
        const { data } = await rawHttp.put(url, other)
        return toast.success(data.detail || 'Other Section updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, other)
    return toast.success(data_1.detail || 'Other Section created successfully')
}

export const fetchCoverLetterTemplate = url => http.get(url).then(({ data }) => data.results)

export const saveCoverLetterTemplate = async (url, { arg: template }) => {
    if (template?.id) {
        const { data } = await rawHttp.put(url, template)
        return toast.success(data.detail || 'Template Section updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, template)
    return toast.success(data_1.detail || 'Template Section created successfully')
}

export const fetchProfile = url => http.get(url).then(({ data }) => data)

export const fetchProjects = url => http.get(url).then(({ data }) => data.results)

export const saveProject = async (url, { arg: project }) => {
    if (project?.id) {
        const { data } = await rawHttp.put(url, project)
        return toast.success(data.detail || 'Project updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, project)
    return toast.success(data_1.detail || 'Project created successfully')
}

export const saveGenericSkill = async (url, { arg: skill }) => {
    if (skill?.id) {
        const { data } = await rawHttp.put(url, skill)
        return toast.success(data.detail || 'Generic Skill updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, skill)
    return toast.success(data_1.detail || 'Generic Skill created successfully')
}

export const fetchGenericSkills = url =>
    http.get(url).then(({ data }) => ({
        skills: data?.results,
        total: data?.count,
        pages: data?.num_pages,
    }))

export const saveSections = async (url, { arg: sections }) => {
    const { data } = await rawHttp.post(url, sections)
    return toast.success(data.detail || 'Sections info saved successfully')
}
