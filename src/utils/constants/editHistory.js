export const EDIT_HISTORY_HEADS = ['Sr.', 'Date', 'User', { lg: 'Changes ', sm: '(From - To)' }]

export const HISTORY_TYPES = {
    Lead: {
        perms: 'view_lead_history',
        msg: 'You are not allowed to view lead history',
    },
    JobDetail: {
        perms: 'view_job_history',
        msg: 'You are not allowed to view job history',
    },
}
