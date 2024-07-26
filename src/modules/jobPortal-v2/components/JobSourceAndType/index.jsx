import { memo } from 'react'

import { useVisitedJobsStore } from '@/stores'

const JobSourceAndType = ({ job = null }) => {
    const [setVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs])

    return job ? (
        <>
            <a
                className='border border-neutral-400 px-2 py-1 rounded-md inline-flex items-center text-[14px] h-fit'
                target='_blank'
                rel='noreferrer'
                href={job?.job_source_url}
                onClick={() => setVisitedJobs(job?.id)}
            >
                <span className='text-neutral-500'>Job Source:</span>
                <span className='ml-2 font-semibold capitalize tracking-widest'>{job?.job_source}</span>
            </a>
            <span className='flex items-center gap-2 border border-neutral-400 px-2 py-1 rounded-md text-[14px] h-fit'>
                <span className='text-neutral-500'>Job Type:</span>
                <span className='text-neutral-700 capitalize tracking-wider'>{job?.job_type}</span>
            </span>
        </>
    ) : null
}

export default memo(JobSourceAndType)
