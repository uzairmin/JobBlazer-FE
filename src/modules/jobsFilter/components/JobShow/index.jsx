import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalFiltersStore, useVisitedJobsStore } from '@/stores'

import { Badge, Loading, Modal } from '@components'

import { fetchJob } from '@modules/jobsFilter/api'

import { formatDate, Id } from '@utils/helpers'

import { SalaryIcon, RegionIcon } from '@icons'

const JobShow = () => {
    const [id, show, setShow] = useJobPortalFiltersStore(state => [state.id, state.show, state.setShow])
    const [inVisitedJobs, setVisitedJobs] = useVisitedJobsStore(state => [state.inVisitedJobs, state.setVisitedJobs])

    const { data, isLoading } = useSWR(`api/profile/job_vertical/?user_id=${Id()}&job_id=${id}`, fetchJob)

    if (isLoading) return <Loading />
    return (
        show && (
            <Modal
                classes='!w-[90%]'
                show={show}
                setShow={setShow}
                content={
                    <div className='pr-2 pt-2 w-full'>
                        <div className='flex flex-col overflow-y-scroll'>
                            <div className='grid grid-cols-1 sm:grid-cols-4'>
                                <div className='flex flex-col col-span-3'>
                                    <div className='flex flex-col space-y-5 px-6 pb-2 pt-1'>
                                        <div className='flex flex-col gap-6 border border-gray-400 shadow p-4 rounded-lg'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-gray-700 text-2xl tracking-wider capitalize inline-flex justify-between'>
                                                    {data?.job_details?.job_title}
                                                    {inVisitedJobs(data?.job_details?.id) && (
                                                        <Badge
                                                            label='Visited'
                                                            classes='!py-0.5 !px-3 mt-2 tracking-widest'
                                                            type='enabled'
                                                        />
                                                    )}
                                                </p>
                                                <p className='text-gray-700 tracking-wider capitalize inline-flex items-center gap-2'>
                                                    {RegionIcon} {data?.job_details?.address ?? 'No address'}
                                                </p>
                                            </div>
                                            <div className='flex gap-2 items-baseline'>
                                                <p className='mr-3 text-gray-500 font-semibold tracking-wider capitalize'>
                                                    Tech Stacks :
                                                </p>
                                                <p className='mr-1 text-sm tracking-widest space-x-3'>
                                                    {data?.job_details?.tech_stacks?.map(tech => (
                                                        <Badge label={tech} classes='!px-4' type='success' />
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 border border-gray-400 shadow rounded-lg p-4'>
                                            <p className='text-gray-500 text-lg font-semibold tracking-wider capitalize'>
                                                Description
                                            </p>
                                            <p className='text-gray-700 text-sm tracking-widest break-all'>
                                                {data?.job_details?.job_description_tags ? (
                                                    <div
                                                        // eslint-disable-next-line react/no-danger
                                                        dangerouslySetInnerHTML={{
                                                            __html: data?.job_details?.job_description_tags,
                                                        }}
                                                    />
                                                ) : (
                                                    <span>No job description found!!</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col border border-gray-400 shadow rounded-lg sm:h-fit py-4'>
                                        <span className='text-2xl text-gray-500 font-semibold ml-4'>About the Job</span>
                                        <div className='grid gap-6 mt-6 px-5 text-gray-800 tracking-wide'>
                                            <p className='flex flex-col gap-1'>
                                                <span className='mr-2 text-gray-600 text-sm'>Company</span>
                                                <span className='capitalize'>{data?.job_details?.company_name}</span>
                                            </p>
                                            <p className='flex flex-col gap-1'>
                                                <span className='mr-2 text-gray-600 text-sm'>Job Source</span>
                                                <span className='capitalize font-semibold text-lg tracking-widest text-[#338d8c]'>
                                                    {data?.job_details?.job_source}
                                                </span>
                                            </p>
                                            <p className='flex flex-col gap-1'>
                                                <span className='mr-2 text-gray-600 text-sm'>Job Posted Date</span>
                                                <span>{formatDate(data?.job_details?.job_posted_date)}</span>
                                            </p>
                                            <p className='flex flex-col gap-1'>
                                                <span className='mr-2 text-gray-600 text-sm'>Job Type</span>
                                                <span className='capitalize'>{data?.job_details?.job_type}</span>
                                            </p>
                                            <p className='flex flex-col gap-1'>
                                                <span className='mr-2 text-gray-600 text-sm'>Salary</span>
                                                <span className='flex gap-2 items-center'>
                                                    <span className='text-neutral-500'>{SalaryIcon}</span>
                                                    {data?.job_details?.salary_min || 'N/A'} -{' '}
                                                    {data?.job_details?.salary_max || 'N/A'}{' '}
                                                    {data?.job_details?.salary_format}
                                                </span>
                                            </p>
                                            <p className='flex flex-col gap-1'>
                                                <span className='mr-2 text-gray-600 text-sm'>Job Visibility</span>
                                                <span className='capitalize text-sm'>
                                                    {data?.job_details?.block ? 'Recruiter' : 'Non Recruiter'}
                                                </span>
                                            </p>
                                            <a
                                                className='border border-[#4ab9a7] uppercase flex flex-row items-center justify-center text-[#4ab9a7] py-1 font-semibold tracking-widest rounded-full hover:bg-[#4ab9a7] hover:text-white'
                                                href={data?.job_details?.job_source_url}
                                                target='_blank'
                                                rel='noreferrer'
                                                onClick={() => setVisitedJobs(data?.job_details?.id)}
                                            >
                                                Visit
                                            </a>
                                        </div>
                                    </div>
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
                            </div>
                        </div>
                    </div>
                }
            />
        )
    )
}
export default memo(JobShow)
