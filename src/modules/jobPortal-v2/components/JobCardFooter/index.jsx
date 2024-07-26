import { memo } from 'react'
import { Link } from 'react-router-dom'

import { useJobPortalV2Store, useVisitedJobsStore } from '@/stores'

import { timeSince, can, formatDate } from '@utils/helpers'

import { UptoIcon, PaginateNext } from '@icons'

const JobCardFooter = ({ job = null }) => {
    const [blocked, updated_at] = useJobPortalV2Store(state => [state?.blocked, state?.updated_at])
    const [setVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs])

    return job ? (
        <div className='flex items-center justify-between mt-3 md:mr-1.5'>
            <span className='text-slate-500 font-semibold -skew-x-3 md:pl-2 inline-flex items-center gap-1 flex-wrap'>
                <span className='text-sm'>{updated_at ? 'Uploaded' : 'Posted'}</span>
                {timeSince(updated_at ? job?.updated_at : job?.job_posted_date)}
                <span className='text-sm font-normal'>({formatDate(updated_at ? job?.updated_at : job?.job_posted_date)})</span>
            </span>
            <div className='flex items-center gap-4 flex-wrap'>
                <a
                    className='inline-flex items-center gap-2 pb-1 font-semibold text-sm border-b text-[#338d8c] border-[#4ab9a7] hover:border-opacity-30 tracking-widest'
                    target='_blank'
                    rel='noreferrer'
                    href={job?.job_source_url}
                    onClick={() => setVisitedJobs(job?.id)}
                >
                    Visit <span className='-rotate-[35deg]'>{PaginateNext}</span>
                </a>
                {can('apply_job') &&
                    (job?.total_vertical > 0 && !blocked ? (
                        <div className='flex items-center gap-2'>
                            <span className='text-sm border rounded px-2 p-0.5 text-[#338d8c] border-[#55bf84] font-mono'>
                                {job?.remaining_vertical} / <strong>{job?.total_vertical}</strong>
                            </span>
                            <div className='flex items-center gap-2 px-2 py-1 border text-[#338d8c] border-[#4ab9a7] rounded-full hover:border-opacity-50'>
                                <Link
                                    to={`/apply-for-job/${job?.id}`}
                                    className='text-sm w-fit !rounded-full !border-0'
                                >
                                    Apply Now
                                </Link>
                                <span>{UptoIcon}</span>
                            </div>
                        </div>
                    ) : (
                        <small className='text-xs text-slate-500 border py-0.5 px-1.5 border-slate-500 rounded-full'>
                            {blocked ? 'blocked' : 'No vertical assigned'}
                        </small>
                    ))}
            </div>
        </div>
    ) : null
}

export default memo(JobCardFooter)
