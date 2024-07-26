import { memo } from 'react'

import { DownIcon, UpIcon, UptoIcon } from '@icons'

const StatsSkeleton = () => {
    const percentageList = (type, records = 5, counts = true) => (
        <div className='pb-5 pl-2'>
            <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                <div className='animate-pulse flex flex-col w-full gap-3'>
                    <div className='bg-gray-300 h-8 w-1/2' />
                    <div className='bg-gray-200 h-3 w-2/3' />
                    {[...Array(records)].map((_, i) => (
                        <div className='flex items-baseline justify-between' key={i}>
                            <div className='flex flex-col gap-2 w-1/3'>
                                <div className='bg-gray-300 h-5 w-full' />
                                {counts && (
                                    <div className='flex gap-5 items-center'>
                                        <div className='bg-gray-200 h-3 w-14' />
                                        <span className='opacity-30'>{UptoIcon}</span>
                                        <div className='bg-gray-200 h-3 w-14' />
                                    </div>
                                )}
                            </div>
                            <div className='flex gap-2 w-24 items-center'>
                                <div className='bg-gray-200 h-4 w-full' />
                                {type === 'up' ? (
                                    <span className='opacity-20'>{UpIcon}</span>
                                ) : (
                                    <span className='opacity-20'>{DownIcon}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className='grid md:grid-cols-2'>
            <div className='flex flex-col'>
                <div className='pb-5 pl-2'>
                    <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                        <div className='animate-pulse flex flex-col w-full gap-3'>
                            <div className='bg-gray-300 h-8 w-1/2' />
                            <div className='bg-gray-200 h-3 w-2/3' />
                            <div className='flex w-1/2 items-center gap-6'>
                                <div className='bg-gray-300 h-5 w-1/2' />
                                <span className='opacity-40'>{UptoIcon}</span>
                                <div className='bg-gray-300 h-5 w-1/2' />
                            </div>
                            <div className='flex w-1/3 items-center gap-6'>
                                <div className='bg-gray-400 h-6 w-1/2' />
                                <span className='opacity-40'>{UptoIcon}</span>
                                <div className='bg-gray-400 h-6 w-1/2' />
                            </div>
                            <div className='flex gap-2 w-1/4 items-center'>
                                <div className='bg-gray-300 h-3 w-full' />
                                <span className='opacity-20'>{UpIcon}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {percentageList('up')}
                {percentageList('down', 3)}
            </div>
            <div className='flex flex-col'>
                {percentageList('up', 4)}
                {percentageList('down', 3)}
                {percentageList('up', 5, false)}
            </div>
        </div>
    )
}
export default memo(StatsSkeleton)
