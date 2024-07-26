import { create } from 'zustand'

import { DYNAMIC_JOB_SOURCES_INITIAL_VALUES } from '@constants/settings'

export const useDynamicJobSourcesStore = create(set => ({
    // ------------------- Getters ------------------- //
    ...DYNAMIC_JOB_SOURCES_INITIAL_VALUES,

    // ------------------- Setters ------------------- //
    setSource: source => set(state => ({ ...state, source, show: !state?.show })),
    setQuery: query => set(state => ({ ...state, query })),
    setShow: show => set(state => ({ ...state, show })),
}))

export const useApiJobCountsByTechStore = create(set => ({
    show: false,
    type: 'p2s',
    dates: { start: null, end: null },

    setShow: show => set(state => ({ ...state, show: show || !state.show })),
    setType: type => set(state => ({ ...state, type })),
    setDates: (type, value) => set(state => ({ ...state, dates: { ...state.dates, [type]: value } })),
}))
