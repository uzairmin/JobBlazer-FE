export const JOB_TYPE_NUMBER_STYLE = {
    transition: '0.8s ease-out',
    fontSize: 30,
    transitionProperty: 'background-color, color, opacity',
}

export const TECH_STACK_NUMBER_STYLE = {
    transition: '0.8s ease-out',
    fontSize: 22,
    transitionProperty: 'background-color, color, opacity',
}

export const DEFAULT_FILTER_VALS = {
    week: '',
    month: '',
    year: '',
    quarter: '',
    from: '',
    to: '',
}

export const ANALYTIC_INITIAL_VALUES = {
    filter: false,
    query: '',
    percent: '',
    minimum: '',
    bar: 'total',
    stack: 'others dev',
    excluded: [],
    ...DEFAULT_FILTER_VALS,
}

export const JOB_TYPE_COLORS = ['#532747', '#1c5655', '#526acb', '#644897', '#8e272b', '#2d455c', '#4ab9a7']

export const JOB_TYPES = {
    contract_on_site: 'Contract On Site',
    contract_remote: 'Contract Remote',
    full_time_on_site: 'Full Time On Site',
    full_time_remote: 'Full Time Remote',
    hybrid_full_time: 'Hybrid Full Time',
    hybrid_contract: 'Hybrid Contract',
    total: 'Total',
}

export const JOB_TYPE_COLORS2 = {
    contract_on_site: '#644897',
    contract_remote: '#2d455c',
    full_time_on_site: '#526acb',
    full_time_remote: '#532747',
    hybrid_full_time: '#8e272b',
    hybrid_contract: '#1c5655',
    total: '#4ab9a7',
}

export const GRAPHS_DIVS_IDS = [
    'job-type-counts',
    'job-type-pies',
    'tech-stack-counts',
    'tech-stack-pies',
    'tech-stack-bars',
    'jobs-trends-chart',
    'tech-stack-category-trends-bars',
]

export const MONTHS = [
    { name: 'January', key: 'january', abr: 'jan', color: '#C9B660' },
    { name: 'February', key: 'february', abr: 'feb', color: '#91C960' },
    { name: 'March', key: 'march', abr: 'mar', color: '#FF5B33' },
    { name: 'April', key: 'april', abr: 'apr', color: '#862c4d' },
    { name: 'May', key: 'may', abr: 'may', color: '#62c9d3' },
    { name: 'June', key: 'june', abr: 'jun', color: '#5967ff' },
    { name: 'July', key: 'july', abr: 'jul', color: '#0a7e8c' },
    { name: 'August', key: 'august', abr: 'aug', color: '#895734' },
    { name: 'September', key: 'september', abr: 'sep', color: '#890734' },
    { name: 'October', key: 'october', abr: 'oct', color: '#240046' },
    { name: 'November', key: 'november', abr: 'nov', color: '#3a506b' },
    { name: 'December', key: 'december', abr: 'dec', color: '#006ba6' },
]
export const QUARTERS = [
    { name: 'Quarter 1', key: 'q1', color: '#C9B660' },
    { name: 'Quarter 2', key: 'q2', color: '#91C960' },
    { name: 'Quarter 3', key: 'q3', color: '#FF5B33' },
    { name: 'Quarter 4', key: 'q4', color: '#4E6E58' },
]
