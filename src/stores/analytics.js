import { create } from 'zustand'

import { MONTHS, QUARTERS } from '@constants/analytics'

export const useAnalyticsStore = create(set => ({
    // ------------------- Getters ------------------- //
    techStack: {
        months: MONTHS.reduce((acc, month) => ({ ...acc, [month.abr]: true }), {}),
        quarters: QUARTERS.reduce((acc, month) => ({ ...acc, [month.key]: true }), {}),
    },
    category: {
        months: MONTHS.reduce((acc, month) => ({ ...acc, [month.abr]: true }), {}),
        quarters: QUARTERS.reduce((acc, month) => ({ ...acc, [month.key]: true }), {}),
    },

    // ------------------- Setters ------------------- //
    toggleTechStack: {
        months: key =>
            set(state => ({
                ...state,
                techStack: {
                    ...state.techStack,
                    months: { ...state.techStack.months, [key]: !state.techStack.months[key] },
                },
            })),
        quarters: key =>
            set(state => ({
                ...state,
                techStack: {
                    ...state.techStack,
                    quarters: { ...state.techStack.quarters, [key]: !state.techStack.quarters[key] },
                },
            })),
    },
    toggleCategory: {
        months: key =>
            set(state => ({
                ...state,
                category: {
                    ...state.category,
                    months: { ...state.category.months, [key]: !state.category.months[key] },
                },
            })),
        quarters: key =>
            set(state => ({
                ...state,
                category: {
                    ...state.category,
                    quarters: { ...state.category.quarters, [key]: !state.category.quarters[key] },
                },
            })),
    },
}))
