import { memo } from 'react'

const TermsOfService = memo(() => (
    <div>
        <p className='font-light text-xs leading-3 sm:leading-4 text-[rgba(0,99,102,0.7)]'>
            By signing in, you agree to our <span className='font-bold'>Terms of Service</span> and
            <span className='font-bold ml-1'>Privacy Policy</span>
        </p>
        <p className='font-light text-xs leading-3 text-[rgba(0,99,102,0.7)] mt-1.5'>
            <span className='font-bold'>Copyright © 2023 Octagon.</span> All rights reserved
        </p>
    </div>
))

export default TermsOfService
