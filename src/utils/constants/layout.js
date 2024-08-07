import {
    DashboardIcon,
    ReportIcon,
    Jobs,
    JobsUploaderIcon,
    ManagementIcon,
    UserIcon,
    CompaniesIcon,
    RolesIcon,
    SettingIcon,
    IntegrationIcon,
    UserAppliedJobIcon,
    TeamAppliedJobsIcon,
    TeamsIcon,
    CoverLetter,
    ScrapperIcon,
    LoggerIcon,
    ResumeIcon,
    PseudoIcon,
    StatusIcon,
    PhaseIcon,
    LeadIcon,
    LeadManagementIcon,
    CandidateIcon,
    ExposedCandidateIcon,
    AnalyticsIcon,
    JobCompaniesIcon,
    GenericSkillIcon,
    ApiLogsIcon,
    RegionIcon,
    AppliedJobsIcon,
    PermissionsIcon,
    TechSTack,
    JobPortalV2Icon,
    JobSourcesIcon,
} from '@icons'

export const menuItems = [
    {
        label: 'Dashboard',
        link: '/',
        svg: DashboardIcon,
        perms: ['view_dashboard', 'view_statistics'],
    },
    {
        label: 'Analytics',
        link: '/analytics',
        svg: AnalyticsIcon,
        perms: ['view_analytics'],
    },
    {
        label: 'Jobs',
        link: '#!',
        svg: ReportIcon,
        key: 'jobs',
        perms: [
            'view_applied_job',
            'view_user_applied_job',
            'view_job_uploader',
            'view_team_applied_job',
            'view_job_portal',
            'view_cover_letter',
            'view_job_scrapper',
            'view_job_company',
            'view_manual_job',
        ],
        subItems: [
            // {
            //     label: 'Applied Jobs',
            //     link: '/applied-jobs',
            //     svg: AppliedJobsIcon,
            //     perms: ['view_applied_job'],
            // },
            // {
            //     label: 'My Applied Jobs',
            //     link: '/user-applied-jobs',
            //     svg: UserAppliedJobIcon,
            //     perms: ['view_user_applied_job'],
            // },
            // {
            //     label: 'Jobs Uploader',
            //     link: '/jobs-uploader',
            //     svg: JobsUploaderIcon,
            //     perms: ['view_job_uploader', 'view_manual_job'],
            // },
            // {
            //     label: 'Team Applied Jobs',
            //     link: '/team-applied-jobs',
            //     svg: TeamAppliedJobsIcon,
            //     perms: ['view_team_applied_job'],
            // },
            // {
            //     label: 'Jobs Portal',
            //     link: '/jobs-portal',
            //     svg: Jobs,
            //     perms: ['view_job_portal'],
            // },
            {
                label: 'Job Portal v2',
                link: '/jobs-portal/v2',
                svg: JobPortalV2Icon,
                perms: ['view_job_portal'],
                // new: true,
            },
            // {
            //     label: 'Cover Letter',
            //     link: '/coverletter',
            //     svg: CoverLetter,
            //     perms: ['view_cover_letter'],
            // },
            {
                label: 'Job Scrapper',
                link: '/job-scrapper',
                svg: ScrapperIcon,
                perms: ['view_job_scrapper'],
            },
            // {
            //     label: 'Job Companies',
            //     link: '/job-companies',
            //     svg: JobCompaniesIcon,
            //     perms: ['view_job_company'],
            // },
        ],
    },
    // {
    //     label: 'Lead Management',
    //     link: '#!',
    //     svg: LeadManagementIcon,
    //     key: 'leads',
    //     perms: [
    //         'view_lead',
    //         'view_status',
    //         'view_company_status',
    //         'view_phase',
    //         'view_candidate',
    //         'view_designation',
    //         'assign_candidate',
    //         'view_exposed_candidate',
    //     ],
    //     subItems: [
    //         {
    //             label: 'My Leads',
    //             link: '/leads',
    //             svg: LeadIcon,
    //             perms: ['view_lead'],
    //         },
    //         {
    //             label: 'Statuses',
    //             link: '/status',
    //             svg: StatusIcon,
    //             perms: ['view_status'],
    //         },
    //         {
    //             label: 'Status',
    //             link: '/company-status',
    //             svg: StatusIcon,
    //             perms: ['view_company_status'],
    //         },
    //         {
    //             label: 'Phases',
    //             link: '/phases',
    //             svg: PhaseIcon,
    //             perms: ['view_phase'],
    //         },
    //         {
    //             label: 'Candidates',
    //             link: '/candidates',
    //             svg: CandidateIcon,
    //             perms: ['view_candidate', 'view_designation'],
    //         },
    //         {
    //             label: 'Exposed Candidates',
    //             link: '/exposed-candidates',
    //             svg: ExposedCandidateIcon,
    //             perms: ['view_exposed_candidate'],
    //         },
    //         {
    //             label: 'Exposed Teams',
    //             link: '/exposed-teams',
    //             svg: ExposedCandidateIcon,
    //             perms: ['view_exposed_candidate'],
    //         },
    //     ],
    // },
    {
        label: 'Management',
        link: '#!',
        svg: ManagementIcon,
        key: 'management',
        perms: ['view_user', 'view_role', 'view_company', 'view_team', 'view_pseudo'],
        subItems: [
            {
                label: 'Users',
                link: '/users',
                svg: UserIcon,
                perms: ['view_user'],
            },
            {
                label: 'Companies',
                link: '/companies',
                svg: CompaniesIcon,
                perms: ['view_company'],
            },
            {
                label: 'Roles',
                link: '/roles',
                svg: RolesIcon,
                perms: ['view_role'],
            },
            {
                label: 'Teams',
                link: '/teams',
                svg: TeamsIcon,
                perms: ['view_team'],
            },
            {
                label: 'Pseudos',
                link: '/pseudos',
                svg: PseudoIcon,
                perms: ['view_pseudo'],
            },
        ],
    },
    {
        label: 'Settings',
        link: '#!',
        svg: SettingIcon,
        key: 'settings',
        perms: [
            'view_integration',
            'view_resume_builder',
            'view_logger',
            'view_region',
            'view_permission',
            'view_api_logs',
            'view_tech_stacks_categories',
        ],
        subItems: [
            // {
            //     label: 'Integrations',
            //     link: '/integrations',
            //     svg: IntegrationIcon,
            //     perms: ['view_integration'],
            // },
            // {
            //     label: 'Resume Builder',
            //     link: '/resume-builder',
            //     svg: ResumeIcon,
            //     perms: ['view_resume_builder'],
            // },
            {
                label: 'Generic Skills',
                link: '/generic-skills',
                svg: GenericSkillIcon,
                perms: ['view_generic_skill'],
            },
            {
                label: 'Logger',
                link: '/logger',
                svg: LoggerIcon,
                perms: ['view_logger'],
            },
            {
                label: 'API Logs',
                link: '/api-logs',
                svg: ApiLogsIcon,
                perms: ['view_api_logs'],
            },
            {
                label: 'Regions',
                link: '/regions',
                svg: RegionIcon,
                perms: ['view_region'],
            },
            {
                label: 'Permissions',
                link: '/permissions',
                svg: PermissionsIcon,
                perms: ['view_permission'],
            },
            {
                label: 'Tech Stacks Categories',
                link: '/tech-stacks-categories',
                svg: TechSTack,
                perms: ['view_tech_stacks_categories'],
            },
            {
                label: 'Job Sources',
                link: '/job-sources',
                svg: JobSourcesIcon,
                perms: ['view_job_source'],
                new: true,
            },
        ],
    },
    // {
    //     label: 'My Profile',
    //     link: '/my-profile',
    //     svg: UserIcon,
    //     perms: ['view_candidate_profile'],
    // },
]
