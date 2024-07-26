import { memo } from 'react'

import { Badge } from '@components'

const TechKeywords = ({ keywords }) =>
    keywords ? (
        <span className='flex items-center gap-2 border border-neutral-400 px-2 py-1 rounded-md text-[14px] h-fit'>
            <span className='text-neutral-500'>Tech Stacks:</span>
            <span className='text-neutral-700 capitalize tracking-wider inline-flex flex-wrap gap-2 text-xs'>
                {keywords?.map((stack, index) => (
                    <Badge label={stack} type='success' classes='!text-xs' key={index} />
                ))}
            </span>
        </span>
    ) : null

export default memo(TechKeywords)
