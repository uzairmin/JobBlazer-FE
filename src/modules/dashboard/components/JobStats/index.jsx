import { memo } from 'react'
import useSWR from 'swr'

import {
    JobsComparison,
    ThrivingSources,
    DecliningSources,
    ThrivingTechnologies,
    DecliningTechnologies,
    ThrivingJobTitles,
    StatsSkeleton,
    EmergingJobTitles,
} from '@modules/dashboard/components'
import { fetchJobStats } from '@modules/dashboard/api'

const JobStats = () => {
    const { data, isLoading, error } = useSWR(`/api/job_portal/trending_jobs_stats/`, fetchJobStats)

    return !error ? (
        isLoading ? (
            <StatsSkeleton />
        ) : (
            <div className='grid md:grid-cols-2'>
                <div className='flex flex-col'>
                    <JobsComparison data={data?.jobs?.month} />
                    <ThrivingTechnologies
                        data={data?.thriving_tech_stacks?.month}
                        relative={data?.thriving_tech_stack_status}
                    />
                    <DecliningTechnologies
                        data={data?.declining_tech_stacks?.month}
                        relative={data?.declining_tech_stack_status}
                    />
                </div>
                <div className='flex flex-col'>
                    <ThrivingSources data={data?.thriving_sources?.month} relative={data?.thriving_source_status} />
                    <DecliningSources data={data?.declining_sources?.month} relative={data?.declining_source_status} />
                    <ThrivingJobTitles data={data?.thriving_titles?.month} />
                    <EmergingJobTitles data={data?.emerging_titles?.month} />
                </div>
            </div>
        )
    ) : null
}

export default memo(JobStats)
