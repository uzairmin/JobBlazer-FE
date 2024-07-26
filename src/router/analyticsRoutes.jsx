import { Analytics } from '@modules'

export const analyticsRoutes = [
    {
        path: '/analytics',
        component: <Analytics />,
        protect: true,
        title: 'Analytics',
        permission: 'all',
    },
]
