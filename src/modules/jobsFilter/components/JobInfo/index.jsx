import { memo } from 'react'

import { formatDate } from '@utils/helpers'

const JobInfo = ({ job }) => (
    <div className='flex flex-col bg-white border p-3 space-y-1 mb-4'>
        <p className='text-lg'>Job Info</p>
        <hr className='pb-2' />
        <div className='flex justify-between flex-wrap'>
            <span className='text-gray-600'>Title</span>
            <span className='capitalize'>{job?.name ?? 'N/A'}</span>
        </div>
        <div className='flex justify-between flex-wrap'>
            <span className='text-gray-600'>Company</span>
            <span className='capitalize'>{job?.company ?? 'N/A'}</span>
        </div>
        <div className='flex justify-between flex-wrap'>
            <span className='text-gray-600'>Source / Link</span>
            <span className='capitalize text-blue-700'>
                <a href={job?.link ?? '#'} target='_blank' rel='noopener noreferrer'>
                    {job?.source ?? 'N/A'}
                </a>
            </span>
        </div>
        <div className='flex justify-between flex-wrap'>
            <span className='text-gray-600'>Type</span>
            <span className='capitalize'>{job?.type ?? 'N/A'}</span>
        </div>
        <div className='flex justify-between flex-wrap'>
            <span className='text-gray-600'>Job Post Date</span>
            <span className='capitalize'>{formatDate(job?.posted_at)}</span>
        </div>
    </div>
)

export default memo(JobInfo)
