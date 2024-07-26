export const PSEUDO_HEADS = ['ID', 'Name', 'Verticals', '']

export const VERTICAL_SECTIONS = {
    basic: 'Basic Info',
    skill: 'Skill Set',
    experience: 'Experience',
    project: 'Projects',
    education: 'Education History',
    language: 'Languages',
    link: 'Social Links',
    other: 'Other Sections',
    cover_letter_template: 'Cover Letter Template',
    resume_preview: 'Resume Preview',
    delete: 'Delete Vertical',
}

export const VERTICAL_INITIAL_TABS = {
    basic: true,
    skill: false,
    experience: false,
    project: false,
    education: false,
    language: false,
    link: false,
    other: false,
    cover_letter_template: false,
    resume_preview: false,
    delete: false,
}

export const BASIC_INFO_INPUTS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        ph: 'Enter vertical name',
        required: true,
    },
    {
        name: 'designation',
        label: 'Designation',
        type: 'text',
        ph: 'Enter vertical designation',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        ph: 'Enter vertical email',
        required: true,
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        ph: 'Enter vertical phone',
        required: false,
    },
    {
        name: 'portfolio',
        label: 'Portfolio website',
        type: 'url',
        ph: 'Enter vertical portfolio website',
        required: false,
    },
    {
        name: 'identity',
        label: 'Identity',
        type: 'text',
        ph: 'Enter vertical identity like Python, Rails, or nothing..',
        required: false,
    },
]

export const PROFICIENCY_LEVELS = {
    1: 'Beginner',
    2: 'Elementary',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert',
}

export const SOCIAL_PLATFORM_OPTIONS = [
    { label: 'Linkedin', value: 'linkedin' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Behance', value: 'behance' },
    { label: 'Github', value: 'github' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'Other', value: 'other' },
]

export const SOCIAL_PLATFORMS = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    instagram: 'Instagram',
    behance: 'Behance',
    github: 'Github',
    twitter: 'Twitter',
    other: 'Other',
}

export const COVER_LETTER_PLACEHOLDERS = [
    'name',
    'job_title',
    'company_name',
    'client_side_skills',
    'server_side_skills',
    'devops_side_skills',
    'years_of_experience',
    'core_side_skills',
    'database_side_skills',
    'libraries_side_skills',
    'tools_side_skills',
]

export const GENERIC_SKILL_TYPES_OPTIONS = [
    { value: 'clientside', label: 'Client Side' },
    { value: 'serverside', label: 'Server Side' },
    { value: 'devops', label: 'DevOps' },
    { value: 'others', label: 'Others' },
]

export const GENERIC_SKILL_TYPES = {
    clientside: 'Client Side',
    serverside: 'Server Side',
    devops: 'DevOps',
    others: 'Others',
}

export const DEFAULT_SECTIONS = {
    skill: { name: 'Skill Set', status: true },
    experience: { name: 'Experience', status: true },
    education: { name: 'Education History', status: true },
    link: { name: 'Links', status: true },
    project: { name: 'Projects', status: true },
    language: { name: 'Languages', status: true },
    summary: { name: 'Summary', status: true },
    email: { name: 'Email', status: true },
    address: { name: 'Address', status: true },
    portfolio: { name: 'Portfolio', status: true },
    designation: { name: 'Designation', status: true },
    phone: { name: 'Phone', status: true },
    name: { name: 'Name', status: true },
    avatar: { name: 'Avatar', status: true },
    hobby: { name: 'Hobbies', status: true },
}

export const BASIC_INFO_SECTIONS = ['name', 'address', 'portfolio', 'email', 'phone', 'designation', 'avatar', 'hobby']
