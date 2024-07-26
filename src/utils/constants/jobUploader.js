import { today } from '@constants/dashboard'

export const MANUAL_JOBS_HEADS = ['Date Posted', 'Title', 'Company', 'Source', 'Tech', 'Type', 'Salary', '']

export const CREATE_JOB_FORM_INITIAL_VALUES = {
    job_title: '',
    company_name: '',
    job_source: '',
    job_type: '',
    address: '',
    job_posted_date: today,
    time: '',
    job_source_url: '',
    job_description_tags: '',
    tech_keywords: '',
    salary_max: '',
    salary_min: '',
    salary_format: '',
    job_role: '',
}
