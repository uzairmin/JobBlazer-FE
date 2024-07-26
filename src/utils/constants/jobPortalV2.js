import { formatDate5, formatTime, parseSelectedTechs } from '@utils/helpers'

export const ORDER_BY_OPTIONS = {
    '-job_posted_date': 'Posted Date',
    '-updated_at': 'Uploaded Date',
    job_title: 'Job Title',
    company: 'Companies',
    job_type: 'Job Type',
}

export const VISIBILITY_OPTIONS = {
    all: 'All',
    recruiter: 'Recruiter',
    'non-recruiter': 'Non-Recruiter',
}

export const FILTERS_DEFAULT_VALUES = {
    from: '',
    to: '',
    order: '-job_posted_date',
    visible: 'all',
    techs: [],
    sources: [],
    types: [],
    blocked: false,
    limit: 15,
}

export const JOB_PORTAL_INITIAL_URLS = {
    jobs: 'api/job_portal/jobs/?',
    filters: 'api/job_portal/job_filters/?',
}

export const JOBS_STATS_INITIAL_VALUES = {
    total: 0,
    recruited: 0,
    nonRecruited: 0,
    filtered: 0,
    todayUploaded: 0,
}

export const JOBS_STATS_TYPES = {
    total: 'Total Jobs',
    filtered: 'Filtered',
    recruited: 'Recruiters',
    nonRecruited: 'Non Recruiters',
    todayUploaded: 'Today`s Jobs',
}

export const JOB_EDIT_INITIAL_VALUES = job => ({
    job_title: job?.job_title,
    company_name: job?.company_name,
    job_source: job?.job_source,
    job_type: job?.job_type,
    address: job?.address,
    job_posted_date: formatDate5(job?.job_posted_date),
    time: formatTime(job?.job_posted_date),
    job_source_url: job?.job_source_url,
    job_description_tags: job?.job_description_tags,
    tech_keywords: parseSelectedTechs(job?.tech_stacks),
    salary_max: job?.salary_max,
    salary_min: job?.salary_min,
    salary_format: job?.salary_format,
    job_role: job?.job_role || '',
    expired: job?.expired_at,
})

export const LIMIT_OPTIONS = [15, 50, 100, 150, 200, 250]
