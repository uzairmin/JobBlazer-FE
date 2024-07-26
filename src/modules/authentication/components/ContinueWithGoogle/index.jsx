import { memo } from 'react'

import googleLogo from '@images/Google-Logo.png'

const ContinueWithGoogle = memo(() => (
    <button
        type='submit'
        className='w-full text-gray rounded-lg text-sm px-5 py-2 text-center shadow-[0px_0px_3px_rgba(0,0,0,0.084),0px_2px_3px_rgba(0,0,0,0.168)]'
    >
        <span className='flex flex-row items-center justify-center'>
            <img src={googleLogo} alt='logo' className='mr-2' />
            Continue with Google
        </span>
    </button>
))

export default ContinueWithGoogle
