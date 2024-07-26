import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const JobSourceChecks = ({ jobSources = null }) => {
    const [sources, expand, setSources, toggle] = useJobPortalV2Store(state => [
        state?.filters?.sources,
        state?.expand,
        state?.setFilters?.sources,
        state?.toggleExpand,
    ])

    const expandedSources = !expand?.sources ? jobSources?.slice(0, 5) : jobSources

    return (
        <div className='w-full'>
            Job Sources
            <hr className='mb-3 bg-slate-300 h-0.5' />
            {jobSources?.length > 0 && (
                <div className='grid pl-2 space-y-3'>
                    {expandedSources?.map((type, index) => (
                        <div className='flex items-center justify-between' key={index}>
                            <div className='inline-flex items-center gap-2 capitalize text-sm tracking-wide'>
                                <input
                                    type='checkbox'
                                    value={type?.name}
                                    checked={sources?.includes(type?.name)}
                                    onChange={e => setSources(e.target.value, e.target.checked)}
                                    className='w-[1.1rem] h-[1.1rem] rounded accent-cyan-600 outline-none cursor-pointer'
                                />
                                {type?.name}
                            </div>
                            <small className='bg-[#edfffb] font-mono'>{type?.value}</small>
                        </div>
                    ))}
                </div>
            )}
            {jobSources?.length > 5 && (
                <button
                    onClick={() => toggle?.sources()}
                    className='text-gray-600 underline underline-offset-4 mt-2 text-xs float-right'
                >
                    {!expand?.sources ? 'Expand' : 'Collapse'}
                </button>
            )}
        </div>
    )
}

export default memo(JobSourceChecks)
