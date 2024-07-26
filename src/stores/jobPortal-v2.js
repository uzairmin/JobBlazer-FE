import { create } from 'zustand'

import { getFilterAppliedURL } from '@utils/helpers'
import { FILTERS_DEFAULT_VALUES, JOBS_STATS_INITIAL_VALUES, JOB_PORTAL_INITIAL_URLS } from '@constants/jobPortalV2'

export const useJobPortalV2Store = create(set => ({
    url: JOB_PORTAL_INITIAL_URLS,
    query: '',
    filters: FILTERS_DEFAULT_VALUES,
    focused: null,
    job: null,
    mutator: null,
    expand: { sources: false, types: false, filters: false },
    view: 'list',
    pagination: { next: null, previous: null },
    stats: JOBS_STATS_INITIAL_VALUES,
    show: false,
    edit: false,
    id: null,
    updated_at: false,

    applyFilters: () =>
        set(state => ({
            ...state,
            updated_at: state?.filters?.order === '-updated_at',
            url: {
                filters: `${JOB_PORTAL_INITIAL_URLS?.filters}${getFilterAppliedURL(state?.query, state?.filters)}`,
                jobs: `${JOB_PORTAL_INITIAL_URLS?.jobs}${getFilterAppliedURL(state?.query, state?.filters)}`,
            },
        })),
    setQuery: value => set(state => ({ ...state, query: value })),
    setFilters: {
        from: value => set(state => ({ ...state, filters: { ...state.filters, from: value } })),
        to: value => set(state => ({ ...state, filters: { ...state.filters, to: value } })),
        order: value => set(state => ({ ...state, filters: { ...state.filters, order: value } })),
        visible: value => set(state => ({ ...state, filters: { ...state.filters, visible: value } })),
        techs: value => set(state => ({ ...state, filters: { ...state.filters, techs: value } })),
        sources: (value, add) =>
            set(state => ({
                ...state,
                filters: {
                    ...state.filters,
                    sources: add
                        ? [...state.filters.sources, value]
                        : state.filters.sources.filter(val => val !== value),
                },
            })),
        types: (value, add) =>
            set(state => ({
                ...state,
                filters: {
                    ...state.filters,
                    types: add ? [...state.filters.types, value] : state.filters.types.filter(val => val !== value),
                },
            })),
        blocked: value => set(state => ({ ...state, filters: { ...state.filters, blocked: value } })),
        limit: value => set(state => ({ ...state, filters: { ...state.filters, limit: value } })),
    },
    resetFilters: () =>
        set(state => ({
            ...state,
            filters: FILTERS_DEFAULT_VALUES,
            query: '',
            url: JOB_PORTAL_INITIAL_URLS,
        })),
    setFoucused: (key, arrayLength) => {
        if (arrayLength > 0) {
            switch (key) {
                case 'ArrowUp':
                    set(state => ({ ...state, focused: state.focused === null ? 0 : state.focused - 1 }))
                    break
                case 'ArrowDown':
                    set(state => ({ ...state, focused: state.focused === arrayLength - 1 ? null : state.focused + 1 }))
                    break
                default:
                    break
            }
        }
    },
    setJob: job => set(state => ({ ...state, job, edit: true })),
    setMutator: func => set(state => ({ ...state, mutator: func })),
    toggleExpand: {
        sources: () => set(state => ({ ...state, expand: { ...state.expand, sources: !state.expand.sources } })),
        types: () => set(state => ({ ...state, expand: { ...state.expand, types: !state.expand.types } })),
        filters: () => set(state => ({ ...state, expand: { ...state.expand, filters: !state.expand.filters } })),
    },
    toggleView: () => set(state => ({ ...state, view: state.view === 'list' ? 'grid' : 'list' })),
    setPagination: (next, previous) => set(state => ({ ...state, pagination: { next, previous } })),
    next: () => set(state => ({ ...state, url: { ...state?.url, jobs: state?.pagination?.next } })),
    previous: () => set(state => ({ ...state, url: { ...state?.url, jobs: state?.pagination?.previous } })),
    setStats: stats =>
        set(state => ({
            ...state,
            stats: {
                total: stats?.total || 0,
                recruited: stats?.recruited || 0,
                nonRecruited: stats?.nonRecruited || 0,
                filtered: stats?.filtered || 0,
                todayUploaded: stats?.todayUploaded || 0,
            },
        })),
    setId: value => set(state => ({ ...state, id: value, show: !state.show })),
    setShow: value => set(state => ({ ...state, show: value })),
    setEdit: value => set(state => ({ ...state, edit: value })),
}))
