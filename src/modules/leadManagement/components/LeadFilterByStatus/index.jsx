import { memo } from 'react'
import useSWR from 'swr'

import { Button } from '@components'

import { fetchStatusPhases } from '@modules/appliedJobs/api'

const LeadFilterByStatus = ({ active = null, dispatch = null }) => {
    const { data, isLoading, error } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    })

    return error ? (
        <small>Error to load status</small>
    ) : isLoading ? (
        'Loading...'
    ) : (
        data?.length > 0 && (
            <div className='flex items-center gap-3 flex-wrap'>
                {data?.map(status => (
                    <Button
                        key={status?.id}
                        label={status?.name ?? 'Un-named'}
                        onClick={() => dispatch({ statusFilter: status?.id })}
                        fit
                        classes='px-7 capitalize font-semibold !rounded-full'
                        fill={status?.id === active}
                    />
                ))}
            </div>
        )
    )
}

export default memo(LeadFilterByStatus)
