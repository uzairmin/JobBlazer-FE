import { memo } from 'react'

import { JobCardFooter, JobCardHead, JobSourceAndType, TechKeywords } from '@modules/jobPortal-v2/components'

const JobCard = ({ job = null }) =>
    job ? (
        <div
            className={`rounded-lg border  border-slate-300 ${
                job?.block ? 'bg-[#d9d5d5] bg-opacity-40 shadow-sm' : 'bg-slate-50'
            }  overflow-hidden hover:bg-white hover:border-[#338d8c] p-3`}
        >
            <JobCardHead job={job} />
            <div className='md:pl-1.5'>
                <div className='grid md:grid-cols-[minmax(0,1fr),minmax(0,1fr)] gap-y-3 gap-x-4 pt-3.5'>
                    {job?.company_name && (
                        <span className='flex items-center gap-2 border border-neutral-400 px-2 py-1 rounded-md text-[14px] h-fit'>
                            <span className='text-neutral-500'>Company:</span>
                            <span className='text-neutral-700 capitalize tracking-wider'>{job?.company_name}</span>
                        </span>
                    )}
                    <JobSourceAndType job={job} />
                    <TechKeywords keywords={job?.tech_stacks} />
                </div>
                <JobCardFooter job={job} />
            </div>
        </div>
    ) : null

export default memo(JobCard)
