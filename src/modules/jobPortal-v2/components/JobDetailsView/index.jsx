import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store, useVisitedJobsStore } from '@/stores'

import { Badge, Loading, Modal } from '@components'

import { fetchJobDetails } from '@modules/jobPortal-v2/api'
import { AppliedVerticals } from '@modules/jobPortal-v2/components'

import { RegionIcon } from '@icons'

const JobDetailsView = () => {
    const [id, show, setShow] = useJobPortalV2Store(state => [state.id, state.show, state.setShow])
    const [inVisitedJobs] = useVisitedJobsStore(state => [state.inVisitedJobs])

    const { data, isLoading } = useSWR(`api/job_portal/jobs/${id}/`, fetchJobDetails)

    if (isLoading) return <Loading />
    return (
        show && (
            <Modal
                classes='md:!w-[90%]'
                show={show}
                setShow={setShow}
                content={
                    <div className='md:pr-2 pt-2 w-full'>
                        <div className='flex flex-col overflow-y-scroll'>
                            <div className='grid grid-cols-1 sm:grid-cols-4'>
                                <div className='flex flex-col col-span-3'>
                                    <div className='flex flex-col space-y-5 md:px-6 pb-2 pt-1'>
                                        <div className='flex flex-col gap-6 border border-gray-400 shadow p-4 rounded-lg'>
                                            <div className='flex flex-col gap-1'>
                                                <div className='text-gray-700 md:text-2xl tracking-wider capitalize inline-flex flex-wrap justify-between'>
                                                    {data?.job_details?.job_title}
                                                    {inVisitedJobs(data?.job_details?.id) && (
                                                        <Badge
                                                            label='Visited'
                                                            classes='!py-0.5 !px-3 mt-2 tracking-widest'
                                                            type='enabled'
                                                        />
                                                    )}
                                                </div>
                                                <p className='text-gray-700 tracking-wider capitalize inline-flex flex-wrap items-center gap-2'>
                                                    {RegionIcon} {data?.job_details?.address ?? 'No address'}
                                                </p>
                                            </div>
                                            <div className='flex gap-2 items-baseline flex-wrap'>
                                                <p className='mr-3 text-gray-500 font-semibold tracking-wider capitalize'>
                                                    Tech Stacks :
                                                </p>
                                                <div className='mr-1 text-sm tracking-widest inline-flex flex-wrap gap-2'>
                                                    {data?.job_details?.tech_stacks?.map(tech => (
                                                        <Badge label={tech} classes='!px-4' type='success' key={tech} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 border border-gray-400 shadow rounded-lg p-4'>
                                            <p className='text-gray-500 text-lg font-semibold tracking-wider capitalize'>
                                                Description
                                            </p>
                                            <div className='text-gray-700 text-sm tracking-widest'>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {data && <AppliedVerticals data={data} />}
                            </div>
                        </div>
                    </div>
                }
            />
        )
    )
}
export default memo(JobDetailsView)
