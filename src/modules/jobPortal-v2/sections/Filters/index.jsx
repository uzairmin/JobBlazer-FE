import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { fetchJobFilters } from '@modules/jobPortal-v2/api'
import {
    PortalLayout,
    OrderBy,
    Visibility,
    TechStackDropdown,
    JobTypeChecks,
    JobSourceChecks,
    FromAndTo,
    Search,
    BlockedCheck,
    ExplicitApply,
    RecordsLimit,
} from '@modules/jobPortal-v2/components'

import { isset } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

const JobPortalV2 = () => {
    const [url, setStats] = useJobPortalV2Store(state => [state?.url?.filters, state?.setStats])

    const { data, error, isLoading } = useSWR(url, fetchJobFilters, {
        ...SWR_REVALIDATE,
        onSuccess: fetchedData => (isset(fetchedData?.stats) ? setStats(fetchedData?.stats) : null),
    })

    return (
        <div className='bg-slate-100 border border-slate-300 rounded-xl overflow-y-scroll h-[90vh]'>
            <PortalLayout loading={isLoading} error={error} module='Filters'>
                <div className='flex flex-col items-center justify-center px-3 py-5 gap-4 text-[#338d8c]'>
                    <Search />
                    <div className='-my-2'>
                        <ExplicitApply />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <OrderBy />
                        <Visibility />
                        <RecordsLimit />
                    </div>
                    <FromAndTo />
                    <TechStackDropdown options={data?.techStacks} />
                    <JobTypeChecks jobTypes={data?.jobTypes} />
                    <JobSourceChecks jobSources={data?.jobSources} />
                    <BlockedCheck />
                    <ExplicitApply />
                </div>
            </PortalLayout>
        </div>
    )
}

export default memo(JobPortalV2)
