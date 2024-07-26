import { create } from 'zustand'

import { getVisitedJobs, removeFilterCounts, saveVisitedJob } from '@utils/helpers'
import { FILTERS_DEFAULT_VALUES } from '@constants/jobPortal'

export const useJobPortalFiltersStore = create(set => ({
    // ------------------- Getters ------------------- //
    ...FILTERS_DEFAULT_VALUES,

    // ------------------- Setters ------------------- //
    setDates: (value, type) => set(state => ({ ...state, dates: { ...state.dates, [type]: value } })),
    setJobType: value => set(state => ({ ...state, jobTypeSelector: value })),
    setJobSources: value => set(state => ({ ...state, jobSourceSelector: removeFilterCounts(value) })),
    setOrdering: value => set(state => ({ ...state, ordering: value })),
    setJobVisibility: value => set(state => ({ ...state, jobVisibilitySelector: value })),
    setTechs: value => set(state => ({ ...state, techStackSelector: removeFilterCounts(value) })),
    toggleBlocked: () => set(state => ({ ...state, blocked: !state.blocked })),
    setJobTitle: value => set(state => ({ ...state, jobTitle: value })),
    setPage: value => set(state => ({ ...state, page: value })),
    reset: () => set(FILTERS_DEFAULT_VALUES),
    setId: value => set(state => ({ ...state, id: value, show: !state.show })),
    setShow: value => set(state => ({ ...state, show: value })),
}))

export const useVisitedJobsStore = create((set, get) => ({
    visitedJobs: getVisitedJobs(),
    setVisitedJobs: value => {
        const newArray = saveVisitedJob(value)
        set(state => ({ ...state, visitedJobs: newArray }))
    },
    inVisitedJobs: value => get()?.visitedJobs?.includes(value),
}))
