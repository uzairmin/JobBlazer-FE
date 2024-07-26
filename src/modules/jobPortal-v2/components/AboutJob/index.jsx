import { memo } from 'react'

import { useVisitedJobsStore } from '@/stores'

import { formatDate } from '@utils/helpers'

import { SalaryIcon } from '@icons'

const AboutJob = ({ job = null }) => {
    const [setVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs])

    return (
        job && (
            <div className='flex flex-col border border-gray-400 shadow rounded-lg sm:h-fit py-4'>
                <span className='text-2xl text-gray-500 font-semibold ml-4'>About the Job</span>
                <div className='grid gap-6 mt-6 px-5 text-gray-800 tracking-wide'>
                    <p className='flex flex-col gap-1'>
                        <span className='mr-2 text-gray-600 text-sm'>Company</span>
                        <span className='capitalize'>{job?.company_name}</span>
                    </p>
                    <p className='flex flex-col gap-1'>
                        <span className='mr-2 text-gray-600 text-sm'>Job Source</span>
                        <span className='capitalize font-semibold text-lg tracking-widest text-[#338d8c]'>
                            {job?.job_source}
                        </span>
                    </p>
                    <p className='flex flex-col gap-1'>
                        <span className='mr-2 text-gray-600 text-sm'>Job Posted Date</span>
                        <span>{formatDate(job?.job_posted_date)}</span>
                    </p>
                    <p className='flex flex-col gap-1'>
                        <span className='mr-2 text-gray-600 text-sm'>Job Type</span>
                        <span className='capitalize'>{job?.job_type}</span>
                    </p>
                    <p className='flex flex-col gap-1'>
                        <span className='mr-2 text-gray-600 text-sm'>Salary</span>
                        <span className='flex gap-2 items-center'>
                            <span className='text-neutral-500'>{SalaryIcon}</span>
                            {job?.salary_min || 'N/A'} - {job?.salary_max || 'N/A'} {job?.salary_format}
                        </span>
                    </p>
                    <p className='flex flex-col gap-1'>
                        <span className='mr-2 text-gray-600 text-sm'>Job Visibility</span>
                        <span className='capitalize text-sm'>{job?.block ? 'Recruiter' : 'Non Recruiter'}</span>
                    </p>
                    <a
                        className='border border-[#4ab9a7] uppercase flex flex-row items-center justify-center text-[#4ab9a7] py-1 font-semibold tracking-widest rounded-full hover:bg-[#4ab9a7] hover:text-white'
                        href={job?.job_source_url}
                        target='_blank'
                        rel='noreferrer'
                        onClick={() => setVisitedJobs(job?.id)}
                    >
                        Visit
                    </a>
                </div>
            </div>
        )
    )
}

export default memo(AboutJob)
