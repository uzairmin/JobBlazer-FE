import { memo } from 'react'

import { HISTORY_TYPES } from '@constants/editHistory'

const Unauthorized = ({ module }) => (
    <div className='flex items-center justify-center min-h-[54vh]'>
        <p className='text-2xl text-neutral-400 border border-neutral-400 px-2 py-12 -skew-x-12'>
            {HISTORY_TYPES[module]?.msg || 'You are Unauthorized'}
        </p>
    </div>
)

export default memo(Unauthorized)
