import { memo } from 'react'
import useSWR from 'swr'

import { Modal, Loading } from '@components'

import { AppliedDetail, JobDetail, UpdatePhase } from '@modules/leadManagement/components'
import { fetchLead } from '@modules/leadManagement/api'
import { fetchStatusPhases } from '@modules/appliedJobs/api'

import { formatDate2 } from '@utils/helpers'

import { BreadIcon } from '@icons'

const LeadModal = ({ vals, dispatch, refetch = null }) => {
    const { data, isLoading, mutate } = useSWR(`/api/lead_managament/leads/${vals.draggable}/`, fetchLead)
    const {
        data: status,
        isLoading: statusLoading,
        error,
    } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases)

    if (isLoading) return <Loading />
    return (
        <Modal
            show={vals.show}
            setShow={show => dispatch({ show })}
            classes='md:!w-1/2'
            content={
                <div className='flex flex-col w-full gap-2.5'>
                    <div className='flex flex-col gap-x-2.5'>
                        <div className='flex flex-col gap-y-2.5'>
                            <div className='flex justify-between mt-1'>
                                <div className='flex items-center space-x-2.5 uppercase'>
                                    <span>{data?.company_status?.status?.name ?? 'Unassigned'}</span>
                                    <span className='text-gray-500'>{BreadIcon}</span>
                                    <span>{data?.phase?.name ?? 'Unphased'}</span>
                                </div>
                                <div className='flex items-center space-x-2 text-sm'>
                                    <span>{formatDate2(data?.effect_date)}</span>
                                    <span>--</span>
                                    <span>{formatDate2(data?.due_date)}</span>
                                </div>
                            </div>
                            <JobDetail job={data?.applied_job_status?.job} />
                            <AppliedDetail applied={data?.applied_job_status} />
                        </div>
                        <div className='w-1/2 mx-auto'>
                            <UpdatePhase
                                lead={data}
                                statuses={status}
                                error={error}
                                loading={statusLoading}
                                mutate={() => {
                                    mutate()
                                    refetch()
                                }}
                            />
                        </div>
                    </div>
                </div>
            }
        />
    )
}

export default memo(LeadModal)
