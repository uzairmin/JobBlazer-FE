import { memo } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'

import { AppliedDetail, JobDetail } from '@modules/leadManagement/components'
import { fetchLead } from '@modules/leadManagement/api'

import { formatDate2 } from '@utils/helpers'

import { BreadIcon } from '@icons'
import { BackToIcon } from '@/assets/icons'

const LeadInfo = ({ id }) => {
    const { data, isLoading, error } = useSWR(`/api/lead_managament/leads/${id}/`, fetchLead)

    return isLoading ? (
        <p>Loading....</p>
    ) : error ? (
        <span>Error to fetch Lead details</span>
    ) : (
        <div className='border py-8 text-[#1E6570] mt-4 relative border-cyan-200 rounded-lg'>
            <p className='-mt-12 absolute px-3 mx-3 border bg-[#EDFDFB] text-lg tracking-widest border-cyan-200'>
                Lead<span className='text-sm'> Info</span>
            </p>
            <div className='flex flex-col gap-4 px-4'>
                <div className='flex items-center space-x-2.5 uppercase text-lg'>
                    <span>{data?.company_status?.status?.name ?? 'Unassigned'}</span>
                    <span className='text-gray-500'>{BreadIcon}</span>
                    <span>{data?.phase?.name ?? 'Unphased'}</span>
                </div>
                <div className='flex items-center space-x-2'>
                    <span>{formatDate2(data?.effect_date)}</span>
                    <span>--</span>
                    <span>{formatDate2(data?.due_date)}</span>
                </div>
                <JobDetail job={data?.applied_job_status?.job} expanded />
                <AppliedDetail applied={data?.applied_job_status} expanded />
                <Link to='/leads' className='!py-1 px-3 flex gap-2 items-center'>
                    {BackToIcon} Back To Leads
                </Link>
            </div>
        </div>
    )
}

export default memo(LeadInfo)
