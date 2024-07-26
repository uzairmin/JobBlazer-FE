import { memo } from 'react'
import { Toaster } from 'react-hot-toast'

import signinLogo from '@images/signin-logo.webp'
import devsincLogo from '@images/poweredBy.svg'

const Layout = memo(({ children }) => (
    <div className='bg-[url(@images/signin-bg.webp)] bg-no-repeat bg-cover bg-center'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
            <a className='flex items-center bg-[#EDFFFB] rounded-lg shadow-[0px_1px_5px_rgba(4,131,131,0.5)] px-12 py-2 -mb-12 z-[1]'>
                <img className='w-42' src={signinLogo} alt='logo' />
            </a>
            <div className='w-full bg-white md:mt-0 sm:max-w-md xl:p-0 shadow-[0px_1px_8px_rgba(0,99,102,0.4)] rounded-xl'>
                <div className='p-6 mt-10 space-y-4 md:space-y-6 sm:p-8'>{children}</div>
            </div>
        </div>
        <div className='absolute bottom-0 right-10 p-5'>
            <a href='https://devsinc.com/' target='_blank' rel='noreferrer'>
                <img src={devsincLogo} alt='logo' />
            </a>
        </div>
        <Toaster />
    </div>
))

export default Layout
