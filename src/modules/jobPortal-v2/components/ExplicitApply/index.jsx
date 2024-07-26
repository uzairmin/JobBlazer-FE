import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const ExplicitApply = () => {
    const [apply, reset] = useJobPortalV2Store(state => [state?.applyFilters, state?.resetFilters])

    return (
        <div className='w-full flex items-center gap-2 justify-center text-sm md:text-[15px]'>
            <span className='cursor-pointer border px-4 py-1 rounded-lg border-[#338d8c]' onClick={() => apply()}>
                Filter
            </span>
            <span className='cursor-pointer border px-4 py-1 rounded-lg border-[#338d8c]' onClick={() => reset()}>
                Reset
            </span>
        </div>
    )
}

export default memo(ExplicitApply)
