import { memo, useState, useRef } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { Button } from '@components'

import { LIMIT_OPTIONS } from '@constants/jobPortalV2'

import { RecordsLimitIcon } from '@icons'

const RecordsLimit = () => {
    const dropdownRef = useRef(null)
    const [showOptions, setShowOptions] = useState(false)

    const [limit, setLimit, apply] = useJobPortalV2Store(state => [
        state?.filters?.limit,
        state?.setFilters?.limit,
        state?.applyFilters,
    ])

    if (showOptions)
        window.addEventListener('click', event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowOptions(false)
        })

    return (
        <div className='relative' ref={dropdownRef}>
            <Button
                label={`Show ${limit} records`}
                icon={RecordsLimitIcon}
                fit
                fill={showOptions}
                classes='order-by !m-0 !py-1.5 !gap-1 !items-center !flex-grow !w-full'
                onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
                <div className='absolute right-0 w-max z-50 bg-white rounded border border-[#55bf84] shadow-md flex flex-col mt-2 text-sm'>
                    {LIMIT_OPTIONS.map(key => (
                        <button
                            key={key}
                            onClick={() => {
                                setLimit(key)
                                setShowOptions(false)
                                apply()
                            }}
                            className={`border-0 text-left hover:underline py-2 px-3 ${
                                key === limit ? 'bg-[#4f9d9b] text-white' : null
                            }`}
                        >
                            {key} <span className='text-xs italic'>Records</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default memo(RecordsLimit)
