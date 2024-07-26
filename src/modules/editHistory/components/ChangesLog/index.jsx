import { memo, useMemo } from 'react'

const ChangesLog = ({ data = [] }) => {
    const memoizedChanges = useMemo(
        () => (
            <div className='w-full mx-auto pl-3'>
                <ol className='border-l border-neutral-300'>
                    {data?.map((row, index) => (
                        <li className='pt-2' key={index}>
                            <div className='flex items-baseline'>
                                <div className='-ml-[6px] h-3 w-3 rounded-full bg-neutral-300' />
                                <p className='ml-4 my-1 w-fit'>
                                    changed <span className='font-semibold italic capitalize'>{row?.field}</span> from
                                    <span className='font-bold mx-1 line-through tracking-wider'>{row?.old_value}</span>
                                    to
                                    <span className='font-semibold ml-1 tracking-wider'>{row?.new_value}</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        ),
        [data]
    )

    return data?.length > 0 ? memoizedChanges : []
}

export default memo(ChangesLog)
