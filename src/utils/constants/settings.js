export const integrations_head = ['#', 'Company', 'Integration', 'Status', '']
export const roleHeads = ['ID', 'Name', 'Description', 'Group', 'Code', '']
export const userHeads = ['ID', 'Email', 'Username', 'Role', 'Company', '']

export const apiStatus = {
    0: 'Enable',
    1: 'Disable',
}

export const integrationNames = [
    { value: 'chat gpt', label: 'Chat GPT' },
    { value: 'github', label: 'Github' },
    { value: 'google', label: 'Google Maps API' },
    { value: 'Twillio API', label: 'Twillio API' },
]

export const API_LOGS_HEADS = ['Sr.', 'ENV', 'Source', 'Created At', 'Total Jobs', 'Status']

export const TECH_STACKS_CATEGORIES_HEADS = ['id', 'category', 'Tech Stacks', 'actions']

export const API_LOGS_INITIAL_VALUES = {
    query: '',
    page: 1,
    filter: false,
    from: '',
    to: '',
    sources: [],
}

export const REGIONS_INITIAL_VALUES = {
    query: '',
    page: 1,
    show: false,
    region: null,
}

export const TECH_STACKS_CATEGORIES_INITIAL_STATE = {
    query: '',
    page: 1,
    show: false,
    trend_analytics: null,
}
export const PERMISSIONS_INITIAL_VALUES = {
    query: '',
    page: 1,
    show: false,
    Permission: '',
    permissionModule: '',
}

export const DYNAMIC_JOB_SOURCES_INITIAL_VALUES = { query: '', show: false, source: null }
