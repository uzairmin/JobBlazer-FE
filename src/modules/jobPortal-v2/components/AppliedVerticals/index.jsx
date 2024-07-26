import { memo } from 'react'

import { Badge } from '@components'

import { AboutJob } from '@modules/jobPortal-v2/components'

const AppliedVerticals = ({ data }) => (
    <div className='flex flex-col gap-4'>
        <AboutJob job={data?.job_details} />
        <div className='flex flex-col border border-gray-400 shadow rounded-lg sm:h-fit p-4'>
            <span className='text-xl text-gray-600'>
                Applied With ({data?.total_applied_count} / {data?.total_verticals_count})
            </span>
            <div className='grid grid-rows-3 grid-flow-col gap-1 mt-3 px-4'>
                {data?.applied_verticals?.map((member, idxx) => (
                    <div className='gap-2' key={idxx}>
                        <Badge label={member?.name} type='success' />
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default memo(AppliedVerticals)
