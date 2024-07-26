export const LEADS_INITIAL_VALS = {
    source: null,
    destination: null,
    show: false,
    page: 1,
    draggable: null,
    filter: false,
    query: '',
    from: '',
    to: '',
    team: '',
    members: [],
    stacks: [],
    candidates: [],
    statusFilter: '',
}

export const NOTE_INITIAL_STATE = {
    id: null,
    query: '',
    msg: '',
    edit: '',
    show: false,
    status: '',
    phase: '',
    attachments: null,
    search: '',
    page: 1,
    editAttachements: {},
}

export const CANDIDATE_INITIAL_STATE = {
    query: '',
    page: 1,
    show: false,
    candidate: null,
    filter: false,
    skills: [],
    regions: [],
    companies: [],
    designations: '',
    from: '',
    to: '',
}

export const CANDIDATE_HEADS = [
    'Sr.',
    'Name',
    'Email',
    'Phone',
    'Experience (years)',
    'Total Leads',
    'Skills',
    'Designation',
    'Company',
    'Going to Leads',
    '',
]

export const CANDIDATE_INPUTS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        ph: 'Enter name',
        required: true,
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        ph: 'Enter phone',
        required: true,
    },
    {
        name: 'experience',
        label: 'Years of experience',
        type: 'number',
        step: '0.5',
        ph: '',
        required: false,
    },
]

export const DESIGNATION_INITIAL_STATE = {
    query: '',
    page: 1,
    show: false,
    designation: null,
}

export const EXPOSED_CANDIDATE_HEADS = ['', 'Candidate', 'Skills', 'Designation', 'Exposed To']

export const EXPOSED_TEAMS_HEADS = ['', 'Teams', 'candidates', 'Exposed To']

export const EXPOSED_CANDIDATE_INITIAL_STATE = {
    query: '',
    show: false,
    ids: [],
    selectedCompanies: [],
}

export const EXPOSED_TEAMS_INITIAL_STATE = {
    query: '',
    show: false,
    team: {},
    ids: [],
    selectedCompanies: [],
}

export const CANDIDATE_SELECT_STATE = {
    query: '',
    page: 1,
    candidate_id: null,
    skills: '',
    designations: '',
    regions: '',
    show: false,
}

export const LEAD_HEADS = [
    'Sr.',
    'Job Title',
    'Job Company',
    'Applier',
    'Vertical',
    'Candidate',
    'Stack',
    'Status',
    'Phase',
    'Created At',
    'Updated At',
    '',
]

export const NOTE_FILTERS_INITIAL = {
    search: '',
    status: '',
    phase: '',
}

export const EMOJIS = [
    '\u{1F604}', // 😀
    '\u{1F970}', // 🥰
    '\u{1F602}', // 😂
    '\u{1F60D}', // 😍
    '\u{1F44D}', // 👍
    '\u{2764}', // ❤️
    '\u{1F44C}', // 👌
    '\u{274C}', // ❌
    '\u{1F44F}', // 👏
    '\u{1F389}', // 🎉
    '\u{1F49C}', // 💜
    '\u{1F31F}', // 🌟
    '\u{1F4AA}', // 💪
    '\u{1F64C}', // 🙌
    '\u{1F381}', // 🎁
    '\u{1F4F1}', // 📱
    '\u{1F44E}', // 👎
    '\u{1F4F2}', // 📲
    '\u{1F64F}', // 🙏
    '\u{1F48C}', // 💌
    '\u{1F575}', // 🕵️‍♂️
    '\u{1F4BB}', // 💻
]
