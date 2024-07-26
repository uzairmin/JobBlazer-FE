import { memo, useState } from 'react'
import useSWR from 'swr'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { CustomSelector } from '@components'

import { fetchTeamAppliedJobsPerHour } from '@modules/teamAppliedJobs/api'

import { formatDate2, parseMembers } from '@utils/helpers'

import { UptoIcon } from '@icons'

const HourlyChart = ({ members = null }) => {
    const [selectedMember, setSelectedMember] = useState({ value: 'all', label: 'All Team Members' })

    const { data, isLoading, error } = useSWR(
        `api/job_portal/team_applied_jobs_memberwise_analytics/?member=${
            selectedMember?.value === 'all' ? '' : selectedMember?.value
        }`,
        fetchTeamAppliedJobsPerHour
    )

    return isLoading ? (
        <span className='text-4xl flex justify-center pt-10 text-[#048C8C] animate-pulse'>Loading ...</span>
    ) : error ? (
        <span className='text-xl flex justify-center pt-10 text-red-400'>Error to load</span>
    ) : (
        <div className='flex flex-col'>
            {members && (
                <div className='flex px-4 pb-2 items-end justify-between'>
                    <span className='text-[#048C8C] font-semibold italic tracking-wider'>
                        {selectedMember?.label ?? 'No BD Selected'}
                    </span>
                    <span className='min-w-[14rem]'>
                        <CustomSelector
                            options={parseMembers(members, null, true)}
                            handleChange={obj => setSelectedMember(obj)}
                            selectorValue={selectedMember}
                            placeholder='Select Member'
                        />
                    </span>
                </div>
            )}
            <ResponsiveContainer width='98%' height={400} className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto'>
                <LineChart data={data?.results} margin={{ top: 40, bottom: 50, right: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                        dataKey='time'
                        stroke='#037571'
                        angle={-27}
                        interval={0}
                        textAnchor='end'
                        allowDuplicatedCategory={false}
                        fontSize={15}
                    />
                    <YAxis stroke='#037571' type='number' fontSize={14} domain={[data?.min, data?.max]} />
                    <Tooltip />
                    <Line
                        dataKey='jobs'
                        stroke='#048C8C'
                        strokeWidth='2'
                        dot={{ stroke: '#048C8C', strokeWidth: 2, r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            {data?.dates && (
                <div className='text-sm flex px-4 pt-2 items-center justify-end text-[#048C8C] tracking-widest'>
                    {formatDate2(data?.dates?.start_date)}
                    &nbsp;{UptoIcon}&nbsp;
                    {formatDate2(data?.dates?.end_date)}
                </div>
            )}
        </div>
    )
}

export default memo(HourlyChart)
