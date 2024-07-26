import { memo } from 'react'

import { UptoIcon } from '@icons'

const RunningGroupLink = ({ link = null }) => (
    <div
        className={`mt-4 flex ${
            link ? 'justify-between' : 'justify-center'
        } items-center p-3 bg-slate-100 border border-[#338d8c] border-opacity-50 rounded-lg`}
    >
        {link ? (
            <>
                <span className='font-semibold'>Running Link:</span>
                <span className='capitalize'>{link?.job_source ?? '--'}</span>
                <span>{link?.job_type ?? '--'}</span>
                <a
                    href={link?.link ?? '#'}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'
                >
                    <span className='animate-ping'>{UptoIcon}</span>
                    <span>Visit link</span>
                </a>
            </>
        ) : (
            <span className='ml-2 text-gray-500'>No group scraper link is running yet!</span>
        )}
    </div>
)

export default memo(RunningGroupLink)
