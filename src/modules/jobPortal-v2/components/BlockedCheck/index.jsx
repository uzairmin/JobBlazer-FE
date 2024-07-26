import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const BlockedCheck = () => {
    const [blocked, setBlocked] = useJobPortalV2Store(state => [state?.filters?.blocked, state?.setFilters?.blocked])

    return (
        <div className='inline-flex items-center gap-2 bg-gray-50 p-2 rounded-lg text-sm w-full border-2'>
            <input
                type='checkbox'
                checked={blocked}
                onChange={e => setBlocked(e.target.checked)}
                className='!w-5 !h-5 rounded accent-cyan-600 cursor-pointer outline-none'
            />
            Show Only Blocked Companies Jobs
        </div>
    )
}

export default memo(BlockedCheck)
