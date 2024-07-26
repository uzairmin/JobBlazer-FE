import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const JobTypeChecks = ({ jobTypes = null }) => {
    const [types, expand, setTypes, toggle] = useJobPortalV2Store(state => [
        state?.filters?.types,
        state?.expand,
        state?.setFilters?.types,
        state?.toggleExpand,
    ])

    const expandedTypes = !expand?.types ? jobTypes?.slice(0, 5) : jobTypes

    return (
        <div className='w-full'>
            Job Listing Types
            <hr className='mb-3 bg-slate-300 h-0.5' />
            {jobTypes?.length > 0 && (
                <div className='grid pl-2 space-y-3'>
                    {expandedTypes?.map((type, index) => (
                        <div className='flex items-center justify-between' key={index}>
                            <div className='inline-flex items-center gap-2 capitalize text-sm tracking-wide'>
                                <input
                                    type='checkbox'
                                    value={type?.name}
                                    checked={types?.includes(type?.name)}
                                    onChange={e => setTypes(e.target.value, e.target.checked)}
                                    className='w-[1.1rem] h-[1.1rem] rounded accent-cyan-600 outline-none'
                                />
                                {type?.name}
                            </div>
                            <small className='bg-[#edfffb] font-mono'>{type?.value}</small>
                        </div>
                    ))}
                </div>
            )}
            {jobTypes?.length > 5 && (
                <button
                    onClick={() => toggle?.types()}
                    className='text-gray-600 underline underline-offset-4 mt-2 text-xs float-right'
                >
                    {!expand?.types ? 'Expand' : 'Collapse'}
                </button>
            )}
        </div>
    )
}

export default memo(JobTypeChecks)
