import { memo } from 'react'

import { useGroupLinksStore } from '@/stores'

import { isset } from '@utils/helpers'

import { UptoIcon } from '@icons'

const GroupLinksSummary = ({ summary = {}, name = null }) => {
    const [toggleDetails] = useGroupLinksStore(state => [state?.toggle?.details])

    return isset(summary) ? (
        <>
            <div className='mb-2 flex justify-between'>
                <span className='tracking-wider italic'>Links Summary</span>
                <span
                    className='underline underline-offset-4 inline-flex gap-2 items-center text-xs cursor-pointer'
                    onClick={() => toggleDetails({ name, id: summary?.group_id })}
                >
                    View Details {UptoIcon}
                </span>
            </div>
            <div className='flex flex-wrap gap-x-3 gap-y-3.5 mt-3'>
                <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-blue-400 text-blue-400'>
                    <span>Total</span>
                    <span className='font-mono'>{summary?.total_count ?? 0}</span>
                </div>
                <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-orange-400 text-orange-400'>
                    <span>Remaining</span>
                    <span className='font-mono'>{summary?.remaining_count ?? 0}</span>
                </div>
                <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-purple-400 text-purple-400'>
                    <span>Completed</span>
                    <span className='font-mono'>{summary?.completed_count ?? 0}</span>
                </div>
                <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-red-400 text-red-400'>
                    <span>Failed</span>
                    <span className='font-mono'>{summary?.failed_count ?? 0}</span>
                </div>
            </div>
        </>
    ) : (
        <span className='text-neutral-500 italic'>No summary found</span>
    )
}

export default memo(GroupLinksSummary)
