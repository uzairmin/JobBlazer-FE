import { memo } from 'react'

const TermsOfService = memo(() => (
    <div className='block'>
        <button className='flex w-full p-2.5 bg-[#048C8C] rounded-xl self-end'>
            <p align='justify' className='text-white float-left text-sm'>
                &copy; 2023 Octagon.inc <br />
                Terms Of Service - Privacy Policy
            </p>
        </button>
    </div>
))

export default TermsOfService
