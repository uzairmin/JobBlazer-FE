export const JOB_HEADS = [
    'Job Title',
    'Company',
    'Job Source',
    'Tech Stack',
    'Job Type',
    'Date Posted',
    'Status',
    'Actions',
    // 'cover letter',
]

export const RESUME_PDF_OPTIONS = {
    margin: 0.015,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
}

export const UPLOAD_RESUME_OPTIONS = [
    { label: 'Choose from templates', value: 'automatic' },
    { label: 'Upload yourself', value: 'manual' },
]

export const EDIT_JOB_INPUTS = [
    {
        name: 'job_title',
        label: 'Job Title',
        type: 'text',
        ph: 'Enter Job Title',
        required: true,
    },
    {
        name: 'company_name',
        label: 'Company Name',
        type: 'text',
        ph: 'Enter Company Name',
        required: true,
    },
    {
        name: 'address',
        label: 'Job Location',
        type: 'text',
        ph: 'Enter Job Location',
        required: true,
    },
    {
        name: 'job_posted_date',
        label: 'Job Posted Date',
        type: 'date',
        ph: 'Enter date',
        required: false,
    },
    {
        name: 'time',
        label: 'Job Posted Time',
        type: 'time',
        ph: 'Enter time',
        required: false,
    },
    {
        name: 'salary_format',
        label: 'Salary Format',
        type: 'text',
        ph: 'Enter Salary Format',
        required: false,
    },
    {
        name: 'salary_max',
        label: 'Maximum Salary',
        type: 'text',
        ph: 'Enter Maximum Salary',
        required: false,
    },
    {
        name: 'salary_min',
        label: 'Minimum Salary',
        type: 'text',
        ph: 'Enter Minimum Salary',
        required: false,
    },
]

export const FILTERS_DEFAULT_VALUES = {
    dates: { from_date: '', to_date: '' },
    techStackSelector: [],
    jobSourceSelector: [],
    jobVisibilitySelector: 'all',
    jobTypeSelector: 'all',
    jobTitle: '',
    ordering: '-job_posted_date',
    blocked: false,
    page: 1,
    show: false,
    id: null,
}
