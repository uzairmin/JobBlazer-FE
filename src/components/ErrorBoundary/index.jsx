import { useRouteError, Link, useLocation, useNavigate } from 'react-router-dom'

import smallLogo from '@images/signin-small-logo.svg'
import { BackToIcon, SignOutIcon } from '@/assets/icons'
import { decodeJwt, removeToken } from '@/utils/helpers'

const ErrorBoundary = () => {
    const error = useRouteError()
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)
    const { user_id } = decodeJwt()
    const env = import.meta.env.VITE_NODE_ENV

    const handleLogout = () => {
        removeToken()
        navigate(0)
    }

    return (
        <div className='h-screen w-full flex items-center justify-center bg-red-50'>
            <div className='flex flex-col -mt-48 gap-5 items-center'>
                <span className='p-3'>
                    <img src={smallLogo} alt='Logo' width='120' />
                </span>
                {env === 'prod' ? (
                    <div className='bg-red-100 text-red-700 px-4 py-3 rounded max-w-sm'>Something went wrong!</div>
                ) : (
                    <div className='bg-red-100 text-red-700 px-4 py-3 rounded max-w-sm'>
                        {error.message || 'Something went wrong!'}
                        <span
                            className='!text-[#048C8C] underline cursor-pointer mx-2 text-sm underline-offset-2'
                            onClick={() => window.location.reload()}
                        >
                            reload
                        </span>
                    </div>
                )}
                {location?.pathname === '/' ? (
                    <a
                        type='button'
                        onClick={handleLogout}
                        className='text-[#048C8C] flex items-center gap-2 md:pt-3 cursor-pointer'
                    >
                        {SignOutIcon} Logout
                    </a>
                ) : (
                    <Link
                        to={user_id ? '/' : '/login'}
                        className='text-[#048C8C] flex items-center gap-2 md:pt-3 cursor-pointer'
                    >
                        {BackToIcon} Back to {user_id ? 'Dashboard' : 'Login'}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default ErrorBoundary
