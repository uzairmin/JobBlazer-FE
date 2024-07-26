import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { JobsListing, Filters, Taskbar } from '@modules/jobPortal-v2/sections'

const JobPortalV2 = () => {
    const [showFilters] = useJobPortalV2Store(state => [state?.expand?.filters])

    return (
        <div className='flex flex-col md:flex-row gap-3 px-2.5 h-full'>
            <div className='hidden md:block md:w-1/5'>
                <Filters />
            </div>
            <div className='block md:hidden'>
                <Taskbar />
            </div>
            <div className='flex flex-col gap-2 w-full md:w-4/5'>
                <div className='hidden md:block'>
                    <Taskbar />
                </div>
                {showFilters && (
                    <div className='block md:hidden'>
                        <Filters />
                    </div>
                )}
                <JobsListing />
            </div>
        </div>
    )
}

export default memo(JobPortalV2)
