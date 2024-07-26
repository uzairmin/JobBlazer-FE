export const tableHeads = [
    'Applied At',
    'Company Name',
    'Job Title',
    'Job Source',
    'TECH STACK',
    'JOB TYPE',
    'Applied By',
    'Vertical',
    'Attachments',
    // 'Status',
]

export const logsTableHeads = ['Created At', 'BD', 'Download Link']
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

export const TEAM_APPLIED_JOBS_INITIAL_VALS = {
    filter: false,
    start: '',
    end: '',
    stacks: [],
    sources: [],
    types: [],
    downlaod: false,
    bd: '',
}

export const TEAM_APPLIED_JOBS_STAT_TABS = {
    source: true,
    type: false,
    hourly: false,
    dropdown: true,
}
