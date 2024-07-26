import { memo } from 'react'

const OrDivider = memo(() => (
    <div className='flex flex-row items-center justify-between px-2'>
        <span className='w-[155px] h-0 border border-solid border-[#048C8C]' />
        <p className='text-sm text-[#048C8C]'>OR</p>
        <span className='w-[155px] h-0 border border-solid border-[#048C8C]' />
    </div>
))

export default OrDivider
