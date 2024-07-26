import { create } from 'zustand'

import { GROUP_LINKS_TABS } from '@constants/scrapper'

export const useGroupLinksStore = create(set => ({
    link: null,
    links: [],
    status: 'total',
    show: { form: false, details: false },
    tabs: GROUP_LINKS_TABS,
    setLink: link => set(state => ({ ...state, link, show: { form: true, details: false } })),
    setLinks: links => set(state => ({ ...state, links })),
    toggle: {
        form: value => set(state => ({ ...state, show: { ...state.show, form: value ?? !state.show.form } })),
        details: value =>
            set(state => ({
                ...state,
                show: { ...state.show, details: !state.show.details },
                link: { name: value?.name, id: value?.id },
                tabs: GROUP_LINKS_TABS,
            })),
    },
    switchTab: key =>
        set(state => {
            const updatedTabs = { ...state.tabs }
            Object.keys(updatedTabs).forEach(k => (updatedTabs[k] = false))
            updatedTabs[key] = true
            return { ...state, tabs: updatedTabs, status: key }
        }),
}))

export const useResctrictedKeywordsStore = create(set => ({
    keyword: null,
    show: false,
    setKeyword: keyword => set(state => ({ ...state, keyword, show: true })),
    setShow: value => set(state => ({ ...state, show: value ?? !state.show })),
}))
