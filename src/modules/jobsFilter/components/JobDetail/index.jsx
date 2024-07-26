import { memo } from 'react'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'

import { Badge, Button, Loading } from '@components'

import { fetchJob } from '@modules/jobsFilter/api'

import { JobSource, TechSTack, UserAppliedJobIcon, CompanyIcon, DateTimeIcon, SalaryIcon } from '@icons'

import { formatDate, Id } from '@utils/helpers'

const JobDetail = () => {
    const { id } = useParams()
    const { data, isLoading } = useSWR(`api/profile/job_vertical/?user_id=${Id()}&job_id=${id}`, fetchJob)

    if (isLoading) return <Loading />
    return (
        <div className='px-6'>
            <div className='flex flex-col border rounded-lg overflow-hidden bg-white text-[#006366]'>
                <div className='grid grid-cols-1 sm:grid-cols-4'>
                    <div className='flex flex-col col-span-3'>
                        <div className='flex flex-col space-y-4  p-6 '>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{UserAppliedJobIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Title :</span>
                                    <span>
                                        {data?.job_details?.job_title}{' '}
                                        <span className='text-gray-1000 font-semibold'>
                                            ({data?.job_details?.job_type})
                                        </span>
                                    </span>
                                </p>
                            </div>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{CompanyIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Company :</span>
                                    <span>{data?.job_details?.company_name}</span>
                                </p>
                            </div>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{DateTimeIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Posted at :</span>
                                    <span>{formatDate(data?.job_details?.job_posted_date)}</span>
                                </p>
                            </div>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{SalaryIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Minimum Salary :</span>
                                    <span>{data?.job_details?.salary_min || 'N/A'}</span>
                                </p>
                            </div>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{SalaryIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Maximum Salary :</span>
                                    <span>{data?.job_details?.salary_max || 'N/A'}</span>
                                </p>
                            </div>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{SalaryIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Salary Format :</span>
                                    <span>{data?.job_details?.salary_format || 'N/A'}</span>
                                </p>
                            </div>
                            <div className='flex flex-row text-sm'>
                                <span className='mr-3'>{SalaryIcon}</span>
                                <p className='flex items-center  text-gray-900'>
                                    <span className='font-semibold mr-2 text-md uppercase'>Salary Range :</span>
                                    <span>{data?.job_details?.estimated_salary || 'N/A'}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full relative bottom-0'>
                            <div className='grid grid-cols-4 border-t divide-x  bg-gray-100  py-3'>
                                <div
                                    className={`uppercase text-xs flex flex-row items-center justify-center font-semibold ${
                                        data?.job_details?.block ? '' : 'line-through text-gray-500'
                                    }`}
                                >
                                    recruiter
                                </div>
                                <div className='uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>{JobSource}</div>
                                    {data?.job_details?.job_source}
                                </div>
                                <div className=' uppercase text-xs flex flex-row items-center justify-center font-semibold'>
                                    <div className='mr-2'>{TechSTack}</div>
                                    {data?.job_details?.tech_keywords}
                                </div>
                                <a
                                    className='uppercase text-xs flex flex-row items-center justify-center font-semibold'
                                    href={data?.job_details?.job_source_url}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <div className='mr-2'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 0 24 24'
                                            width='20px'
                                            fill='#006366'
                                        >
                                            <path d='M0 0h24v24H0z' fill='none' />
                                            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                                        </svg>
                                    </div>
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col border-l  sm:h-full'>
                        <span className='font-semibold  text-xl uppercase mt-4 ml-4 '>
                            Applied With ({data?.totaL_applied_count}/{data?.total_verticals_count})
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
            <div className='flex flex-col border rounded-lg overflow-hidden bg-white my-2 h-auto '>
                <div className='grid grid-cols-1'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col space-y-4 p-6 text-gray-600'>
                            <div className='flex flex-row text-md'>
                                <p className='flex items-center text-gray-900'>
                                    <div dangerouslySetInnerHTML={{ __html: data?.job_details?.job_description_tags   }} />
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full relative bottom-0'>
                            <div className='grid grid-cols-3 border-t divide-x text-gray-500 bg-gray-100 py-3' />
                        </div>
                    </div>
                </div>
            </div>
            <Link to='/jobs-portal' className='float-right'>
                <Button label='Back to Jobs Portal' fit />
            </Link>
        </div>
    )
}
export default memo(JobDetail)
