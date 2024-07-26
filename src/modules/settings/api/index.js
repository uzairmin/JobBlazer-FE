import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchIntegrations = url =>
    http.get(url).then(({ data }) => ({ integrations: data.results, status: 'success' }))

export const saveIntegration = (url, { arg: integration }) => {
    if (integration?.id) {
        return rawHttp
            .put(url, integration)
            .then(({ data }) => toast.success(data.detail || 'Integration updated successfully'))
    }
    return rawHttp.post(url, integration).then(({ data }) => toast.success(data.detail))
}

export const fetchApiLogs = url =>
    http
        .get(url)
        .then(({ data }) => ({ logs: data?.data, pages: data?.links?.num_pages, stats: data?.additional_stats }))

export const fetchRegions = url =>
    http.get(url).then(({ data }) => ({
        regions: data?.results,
        pages: data?.num_pages,
    }))

export const saveRegion = (url, { arg: region }) => {
    if (region?.id) {
        return rawHttp.put(url, region).then(({ data }) => toast.success(data.detail || 'Region updated successfully'))
    }
    return rawHttp.post(url, region).then(({ data }) => toast.success(data.detail))
}

export const saveTechStackCategory = (url, { arg: category }) => {
    if (category?.id) {
        return rawHttp
            .put(url, category)
            .then(({ data }) => toast.success(data.detail || 'TechStack Category updated successfully'))
    }
    return rawHttp
        .post(url, category)
        .then(({ data }) => toast.success(data.detail || 'New Category created successfully'))
}

export const fetchAllRegions = url => http.get(url).then(({ data }) => data)

export const fetchPermissions = url =>
    http.get(url).then(({ data }) => ({ permissions: data?.data, modules: data?.modules }))

export const fetchTechStacksCategory = url => http.get(url).then(({ data }) => data)
export const fetchRoles = url => http.get(url).then(({ data }) => data)

export const savePermission = async (url, { arg: permissions }) => {
    if (permissions.permissions[0]?.id) {
        const { data } = await rawHttp.put(url, permissions.permissions[0])
        return toast.success(data.detail || 'Permission updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, permissions)
    return toast.success(data_1.detail || 'Permission created successfully')
}

export const fetchJobSources = url => http.get(url).then(({ data }) => ({ sources: data }))

export const saveJobSource = (url, { arg: source }) => {
    if (source?.id) {
        return rawHttp
            .put(url, source)
            .then(({ data }) => toast.success(data.detail || 'Job Source updated successfully'))
    }
    return rawHttp.post(url, source).then(({ data }) => toast.success(data.detail || 'Job Source added successfully'))
}
