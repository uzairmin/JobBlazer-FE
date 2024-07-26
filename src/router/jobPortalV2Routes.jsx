import { JobPortalV2 } from '@modules'

export const jobPortalV2Routes = [
    {
        path: '/jobs-portal/v2',
        component: <JobPortalV2 />,
        protect: true,
        title: 'Jobs Portal 2.0',
        permission: 'view_job_portal',
    },
]
