import { memo } from 'react'

import { useJobPortalV2Store, useVisitedJobsStore } from '@/stores'

import { isset } from '@utils/helpers'

import { JobActions } from '@modules/jobPortal-v2/components'

import { RegionIcon, DoubleCheckIcon } from '@icons'

const JobCardHead = ({ job = null }) => {
    const [inVisitedJobs] = useVisitedJobsStore(state => [state.inVisitedJobs])
    const [setId] = useJobPortalV2Store(state => [state?.setId])

    return (
        job && (
            <div className='flex flex-col lg:flex-row items-start justify-between'>
                <div className='flex gap-3 items-start'>
                    <span className='bg-[#338d8c] h-12 min-w-[3rem] rounded-lg text-white uppercase flex items-center justify-center text-lg'>
                        {job?.job_source?.substring(0, 1)}
                    </span>
                    <div className='flex flex-col text-gray-600 gap-y-0.5'>
                        <p
                            className='text-lg capitalize font-semibold flex-wrap cursor-pointer hover:underline hover:underline-offset-4'
                            onClick={() => setId(job?.id)}
                        >
                            {job?.job_title}
                        </p>
                        <span className='text-sm capitalize italic inline-flex items-center gap-1'>
                            {isset(job?.address) ? (
                                <>
                                    {RegionIcon} {job?.address}
                                </>
                            ) : (
                                'No Location'
                            )}
                        </span>
                    </div>
                </div>
                <div className='flex items-end text-[#338d8c] p-2 lg:p-0'>
                    {inVisitedJobs(job?.id) ? (
                        <span className='inline-flex gap-1 items-center text-sm tracking-widest text-white bg-[#338d8c] rounded pl-1 pr-1.5'>
                            {DoubleCheckIcon} Visited
                        </span>
                    ) : null}
                    <JobActions job={job} />
                </div>
            </div>
        )
    )
}
export default memo(JobCardHead)
