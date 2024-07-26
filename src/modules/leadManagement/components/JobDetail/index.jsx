import { memo } from 'react'

import { formatDate } from '@utils/helpers'

const JobDetail = ({ job = null, expanded = false }) =>
    job ? (
        <div className='border p-2'>
            <p className={`${expanded ? 'text-2xl' : 'text-lg'}`}>Job Details</p>
            <hr />
            <div className={`grid ${expanded ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4 gap-y-2 pt-2.5`}>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Title</span>
                    <span className='capitalize'>{job?.job_title ?? 'N/A'}</span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Company</span>
                    <span className='capitalize'>{job?.company_name ?? 'N/A'}</span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600'>Source / Link</span>
                    <span className='capitalize text-blue-700'>
                        <a href={job?.job_source_url ?? '#'} target='_blank' rel='noopener noreferrer'>
                            {job?.job_source ?? 'N/A'}
                        </a>
                    </span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Type</span>
                    <span className='capitalize'>{job?.job_type ?? 'N/A'}</span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Job Post Date</span>
                    <span className='capitalize'>{formatDate(job?.job_posted_date)}</span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Address</span>
                    <span className='capitalize'>{job?.address ?? 'N/A'}</span>
                </div>
            </div>
        </div>
    ) : null

export default memo(JobDetail)
