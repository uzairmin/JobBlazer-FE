import { toast } from 'react-hot-toast'

import { http, rawHttp } from '@utils/http'

export const syncNow = (url, { arg: { link } }) => http.get(link).then(({ data }) => toast.success(data.detail))

export const fetchCronjobSettings = url => http.get(url).then(({ data }) => ({ settings: data, status: 'success' }))

export const fetchJobLogs = url => http.get(url).then(({ data }) => ({ logs: data, status: 'success' }))

export const saveCronjobSetting = (url, { arg: setting }) => {
    if (setting?.id) {
        return rawHttp
            .put(url, setting)
            .then(({ data }) => toast.success(data.detail || 'Cronjob Setting updated successfully'))
    }
    return rawHttp
        .post(url, setting)
        .then(({ data }) => toast.success(data.detail || 'Cronjob Setting created successfully'))
}

export const saveGroupSetting = (url, { arg: setting }) => {
    if (setting?.id) {
        return rawHttp.put(url, setting).then(({ data }) => toast.success(data.detail || 'Group updated successfully'))
    }
    return rawHttp.post(url, setting).then(({ data }) => toast.success(data.detail || 'Group created successfully'))
}
export const saveAccount = (url, { arg: account }) => {
    if (account?.id) {
        return rawHttp
            .put(url, account)
            .then(({ data }) => toast.success(data.detail || 'Account updated successfully'))
    }
    return rawHttp.post(url, account).then(({ data }) => toast.success(data.detail || 'Account created successfully'))
}

export const fetchJobSourceLinks = url => http.get(url).then(({ data }) => ({ links: data?.detail, status: 'success' }))
export const fetchAccounts = url => http.get(url).then(({ data }) => ({ accounts: data, status: 'success' }))
export const fetchGroupLinks = url => http.get(url).then(({ data }) => ({ grouplinks: data, status: 'success' }))

export const fetchGroupLinksDetails = url => http.get(url).then(({ data }) => data)

export const fetchGroupDetails = url => http.get(url).then(({ data }) => ({ groups: data, status: 'success' }))

export const saveJobSourceLink = (url, { arg: link }) => {
    if (link?.id) {
        return rawHttp
            .put(url, link)
            .then(({ data }) => toast.success(data.detail || 'Job Source Link updated successfully'))
    }
    return rawHttp
        .post(url, link)
        .then(({ data }) => toast.success(data.detail || 'Job Source Link created successfully'))
}
export const saveGroupLink = (url, { arg: link }) => {
    if (link?.id) {
        return rawHttp
            .put(url, link)
            .then(({ data }) => toast.success(data.detail || 'Group Link updated successfully'))
    }
    return rawHttp.post(url, link).then(({ data }) => toast.success(data.detail || 'Group Link created successfully'))
}

export const fetchScraperStatus = url => http.get(url).then(({ data }) => data)

export const getScrapperCycleStatus = url => http.get(url).then(({ data }) => data)

export const toggleScrapperCycleStatus = url => {
    rawHttp
        .post(url)
        .then(data =>
            toast.success(`${data.data[0] === 'Sync stopped' ? 'Scrapper Cycle Stopped' : 'Scrapper Cycle Started'} `)
        )
}

export const updateGroupLink = (url, { arg: link }) =>
    rawHttp.put(url, link).then(({ data }) => toast.success(data.detail || 'Group Scraper Link updated successfully'))

export const fetchRestrictedKeywords = url => http.get(url).then(({ data }) => data)

export const saveRestrictedKeyword = (url, { arg: keyword }) => {
    if (keyword?.id) {
        return rawHttp
            .put(url, keyword)
            .then(({ data }) => toast.success(data.detail || 'Restricted Keyword updated successfully'))
    }
    return rawHttp
        .post(url, keyword)
        .then(({ data }) => toast.success(data.detail || 'Restricted Keyword created successfully'))
}
