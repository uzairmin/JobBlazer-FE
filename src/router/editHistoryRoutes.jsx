import { EditHistory } from '@modules'

export const editHistoryRoutes = [
    {
        path: '/edit-history/:rowId',
        component: <EditHistory />,
        protect: true,
        title: 'Edit History',
        permission: 'all',
    },
]
