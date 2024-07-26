import { Navigate } from 'react-router-dom'

import { getToken, can } from '@utils/helpers'

const Protected = ({ children, permission }) => {
    const token = getToken()
    const isAuthorized = permission === 'all' ? true : can(permission)

    return token ? isAuthorized ? children : <Navigate to='/' /> : <Navigate to='/login' />
}

export default Protected
