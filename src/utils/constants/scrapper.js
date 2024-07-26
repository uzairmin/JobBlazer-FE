export const INTERVAL_TYPE_OPTIONS = [
    { label: 'Minutes', value: 'minutes' },
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' },
]

export const JOB_SOURCES_SINGLES = [
    { label: 'Adzuna', value: 'adzuna' },
    { label: 'Dice', value: 'dice' },
    { label: 'Himalayas', value: 'himalayas' },
    { label: 'Indeed', value: 'indeed' },
    { label: 'Workopolis', value: 'workopolis' },
    { label: 'Glassdoor', value: 'glassdoor' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Monster', value: 'monster' },
    { label: 'Talent', value: 'talent' },
    { label: 'Jooble', value: 'jooble' },
    { label: 'Hirenovice', value: 'hirenovice' },
    { label: 'Careerjet', value: 'careerjet' },
    { label: 'Daily Remote', value: 'dailyremote' },
    { label: 'Recruit', value: 'recruit' },
    { label: 'YCombinator', value: 'ycombinator' },
    { label: 'Dynamite', value: 'dynamite' },
    { label: 'Startwire', value: 'startwire' },
    { label: 'US Jora', value: 'usjora' },
    { label: 'Startup', value: 'startup' },
    { label: 'Receptix', value: 'receptix' },
    { label: 'Builtin', value: 'builtin' },
    { label: 'Workable', value: 'workable' },
    { label: 'Clearance', value: 'clearance' },
    { label: 'GetWork', value: 'getwork' },
    { label: 'Ruby On Remote', value: 'ruby_on_remote' },
    { label: 'Hubstaff Talent', value: 'hubstafftalent' },
    { label: 'Just Remote', value: 'justremote' },
    { label: 'Remote CO', value: 'remoteco' },
    { label: 'We Work Remotely', value: 'weworkremotely' },
    { label: 'Other', value: 'other' },
]

export const JOB_SOURCE_OPTIONS = [
    { label: 'Simply Hired', value: 'simplyhired' },
    { label: 'Zip Recruiter', value: 'ziprecruiter' },
    { label: 'Career Builder', value: 'careerbuilder' },
    { label: 'Google Careers', value: 'googlecareers' },
    { label: 'Ruby Now', value: 'rubynow' },
    { label: 'Working Nomads', value: 'workingnomads' },
    { label: 'Arc Dev', value: 'arcdev' },
    { label: 'Remote Ok', value: 'remoteok' },
    { label: 'Job Gether', value: 'jobgether' },
    { label: 'The Muse', value: 'themuse' },
    { label: 'Smart Recruiter', value: 'smartrecruiter' },
    ...JOB_SOURCES_SINGLES,
]

export const JOB_SOURCE_OPTIONS_UNDERSCORE = [
    { label: 'Simply Hired', value: 'simply_hired' },
    { label: 'Zip Recruiter', value: 'zip_recruiter' },
    { label: 'Career Builder', value: 'career_builder' },
    { label: 'Google Careers', value: 'google_careers' },
    { label: 'Ruby Now', value: 'ruby_now' },
    { label: 'Working Nomads', value: 'working_nomads' },
    { label: 'Arc Dev', value: 'arc_dev' },
    { label: 'Remote Ok', value: 'remote_ok' },
    { label: 'Job Gether', value: 'job_gether' },
    { label: 'The Muse', value: 'the_muse' },
    { label: 'Remote CO', value: 'remote_co' },
    ...JOB_SOURCES_SINGLES,
]

export const JOB_TYPES_OPTIONS = [
    { label: 'Full Time Remote', value: 'Full Time Remote' },
    { label: 'Full Time on Site', value: 'Full Time on Site' },
    { label: 'Hybrid Full Time', value: 'Hybrid Full Time' },
    { label: 'Hybrid Contract', value: 'Hybrid Contract' },
    { label: 'Contract Onsite', value: 'Contract Onsite' },
    { label: 'Contract Remote', value: 'Contract Remote' },
]

export const JOB_SOURCES = {
    linkedin: 'Linkedin',
    careerbuilder: 'Career Builder',
    adzuna: 'Adzuna',
    dice: 'Dice',
    himalayas: 'Himalayas',
    indeed: 'Indeed',
    workopolis: 'Workopolis',
    ziprecruiter: 'Zip Recruiter',
    glassdoor: 'Glassdoor',
    monster: 'Monster',
    googlecareers: 'Google Careers',
    jooble: 'Jooble',
    hirenovice: 'Hirenovice',
    careerjet: 'Careerjet',
    talent: 'Talent',
    recruit: 'Recruit',
    ycombinator: 'YCombinator',
    simplyhired: 'Simply Hired',
    rubynow: 'Ruby Now',
    other: 'Other',
    remoteok: 'Remote Ok',
    all: 'All',
    workingnomads: 'Working Nomads',
    arcdev: 'Arc Dev',
    dynamite: 'Dynamite',
    startwire: 'Startwire',
    usjora: 'US Jora',
    jobgether: 'Job Gether',
    startup: 'Startup',
    dailyremote: 'DailyRemote',
    receptix: 'Receptix',
    builtin: 'Builtin',
    workable: 'Workable',
    themuse: 'The Muse',
    clearance: 'Clearance',
    smartrecruiter: 'Smart Recruiter',
    getwork: 'GetWork',
    ruby_on_remote: 'Ruby On Remote',
    // WITH UNDERSCORE
    career_builder: 'Career Builder',
    zip_recruiter: 'Zip Recruiter',
    simply_hired: 'Simply Hired',
    google_careers: 'Google Careers',
    ruby_now: 'Ruby Now',
    working_nomads: 'Working Nomads',
    arc_dev: 'Arc Dev',
    remote_ok: 'Remote Ok',
    job_gether: 'Job Gether',
    the_muse: 'The Muse',
    hubstafftalent: 'Hubstaff Talent',
    justremote: 'Just Remote',
    remoteco: 'Remote CO',
    weworkremotely: 'We Work Remotely',
}

export const SETTING_HEADS = ['ID', 'Source', 'Type', 'Setting', '']
export const GROUP_SETTING_HEADS = ['ID', 'Source', 'Type', 'Setting', 'Days', '']
export const LOGS_HEADS = ['ID', 'Source', 'Total jobs', 'Uploaded jobs', 'Created_at', 'Updated_at']
export const JOB_SOURCE_LINK_HEADS = ['ID', 'Source', 'Links', '']
export const ACCOUNTS_HEADS = ['ID', 'Email', 'Password', 'Source', '']
export const SCRAPER_STATUS_HEADS = [
    'ID',
    'Source',
    'Type',
    'Running status',
    'Uploading status',
    'Start time',
    'End time',
]
export const SCRAPER_GROUP_HEADS = ['ID', 'Name', 'Type', 'Setting']
export const GROUP_SOURCE_LINK_HEADS = ['ID', 'Group', 'Links', '']

export const WEEK_DAYS_OPTIONS = [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
]

export const JOB_TYPES_OPTIONS_SMALLCASE = [
    { label: 'Full Time Remote', value: 'full time remote' },
    { label: 'Full Time on Site', value: 'full time on site' },
    { label: 'Hybrid Full Time', value: 'hybrid full time' },
    { label: 'Hybrid Contract', value: 'hybrid contract' },
    { label: 'Contract Onsite', value: 'contract onsite' },
    { label: 'Contract Remote', value: 'contract remote' },
]

export const JOB_SOURCES_INITIAL_VALS = [
    { label: 'All', value: 'all' },
    ...JOB_SOURCE_OPTIONS.filter(job => job.value !== 'other'),
]

export const GROUP_LINKS_TABS = { total: true, running: false, remaining: false, completed: false, failed: false }

export const ACCOUNT_SOURCES = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'glassdoor', label: 'Glassdoor' },
    { value: 'pia', label: 'Private Internet Access (VPN)' },
]
