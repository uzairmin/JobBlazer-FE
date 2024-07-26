import { Navigate } from 'react-router-dom'

import {
    AppliedJobs,
    Login,
    TeamAppliedJobs,
    // JobSourceBlocking,
    JobsFilter,
    JobsUploader,
    ForgetPassword,
    ResetPassword,
    Companies,
    Roles,
    Users,
    Teams,
    Team,
    Profile,
    CoverLetter,
    Scrapper,
    Pseudos,
    Vertical,
    ApplyForJob,
    ConvertToLead,
    JobCompanies,
} from '@modules'
import { JobDetail } from '@modules/jobsFilter/components'
import App from '@/App'

import { leadsRoutes } from '@router/leadsRoutes'
import { analyticsRoutes } from '@router/analyticsRoutes'
import { settingsRoutes } from '@router/settingsRoutes'
import { editHistoryRoutes } from '@router/editHistoryRoutes'
import { jobPortalV2Routes } from '@router/jobPortalV2Routes'

import { getToken, decodeJwt } from '@utils/helpers'

const { user_id } = decodeJwt()

export const routes = [
    {
        path: '/',
        component: <App />,
        protect: true,
        title: 'Octagon Dashboard',
        permission: 'all',
    },
    {
        path: '/applied-jobs',
        component: <AppliedJobs />,
        protect: true,
        title: 'Applied Jobs',
        permission: 'view_applied_job',
    },
    {
        path: '/team-applied-jobs',
        component: <TeamAppliedJobs />,
        protect: true,
        title: 'Team Appllied Jobs',
        permission: 'view_team_applied_job',
    },
    {
        path: '/jobs-portal',
        component: <JobsFilter />,
        protect: true,
        title: 'Jobs Portal',
        permission: 'view_job_portal',
    },
    {
        path: '/job-details/:id',
        component: <JobDetail />,
        protect: true,
        title: 'Job Details',
        permission: 'view_job_portal',
    },
    {
        path: '/jobs-uploader',
        component: <JobsUploader />,
        protect: true,
        title: 'Job Uploader',
        permission: 'view_job_uploader',
    },
    {
        path: '/companies',
        component: <Companies />,
        protect: true,
        title: 'Companies Management',
        permission: 'view_company',
    },
    // {
    //     path: '/job-source-blocking',
    //     component: <JobSourceBlocking />,
    //     protect: true,
    //     title: 'Job Source Blocking',
    // },
    {
        path: '/roles',
        component: <Roles />,
        protect: true,
        title: 'Roles Management',
        permission: 'view_role',
    },
    {
        path: '/users',
        component: <Users />,
        protect: true,
        title: 'Users Management',
        permission: 'view_user',
    },
    {
        path: '/teams',
        component: <Teams />,
        protect: true,
        title: 'Teams Management',
        permission: 'view_team',
    },
    {
        path: '/user-applied-jobs',
        component: <AppliedJobs userId={user_id} />,
        protect: true,
        title: 'My Applied Jobs',
        permission: 'view_user_applied_job',
    },
    {
        path: '/convert-to-lead/:id',
        component: <ConvertToLead />,
        protect: true,
        title: 'Convert to Lead',
        permission: 'create_lead',
    },
    {
        path: '/profile',
        component: <Profile />,
        protect: true,
        title: 'Profile',
        permission: 'all',
    },
    {
        path: '/coverletter',
        component: <CoverLetter />,
        protect: true,
        title: 'Cover Letter',
        permission: 'all',
    },
    {
        path: '/job-scrapper',
        component: <Scrapper />,
        protect: true,
        title: 'Job Scrapper',
        permission: 'view_job_scrapper',
    },
    {
        path: '/pseudos',
        component: <Pseudos />,
        protect: true,
        title: 'Pseudos',
        permission: 'view_pseudo',
    },
    {
        path: '/vertical/:id',
        component: <Vertical />,
        protect: true,
        title: 'Veritcals',
        permission: 'edit_vertical',
    },
    {
        path: '/team-details/:id',
        component: <Team />,
        protect: true,
        title: 'Team Details',
        permission: 'view_member_team',
    },
    {
        path: '/apply-for-job/:id',
        component: <ApplyForJob />,
        protect: true,
        title: 'Apply For Job',
        permission: 'all',
    },
    {
        path: '/job-companies',
        component: <JobCompanies />,
        protect: true,
        title: 'Block / Unblock Job Companies',
        permission: 'view_user',
    },
    ...leadsRoutes,
    ...analyticsRoutes,
    ...settingsRoutes,
    ...editHistoryRoutes,
    ...jobPortalV2Routes,
]

export const authRoutes = [
    {
        path: 'login',
        element: getToken() ? <Navigate to='/' /> : <Login />,
    },
    {
        path: 'forget-password',
        element: getToken() ? <Navigate to='/' /> : <ForgetPassword />,
    },
    {
        path: 'reset-password',
        element: <ResetPassword />,
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]
