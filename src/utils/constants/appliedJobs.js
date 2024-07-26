export const tableHeads = [
    'Applied At',
    'Company Name',
    'Job Title',
    'Job Source',
    'Tech Stack',
    'Job Type',
    'Status',
    'Agent (BD)',
    'Pseudo',
    'Vertical',
    'Actions',
]

export const jobStatus = {
    0: 'To Apply',
    1: 'Applied',
    2: 'Hired',
    3: 'Rejected',
    4: 'Cold Lead',
    5: 'Warm Lead',
    6: 'Hot Lead',
    7: 'Prospect',
}

export const APPLIED_JOBS_FILTERS_INITIAL_VALS = {
    filter: false,
    from: '',
    to: '',
    stacks: [],
    sources: [],
    types: [],
    verticals: [],
    agents: [],
}
