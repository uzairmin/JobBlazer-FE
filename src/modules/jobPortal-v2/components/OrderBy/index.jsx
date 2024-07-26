import { memo, useState, useRef } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { Button } from '@components'

import { ORDER_BY_OPTIONS } from '@constants/jobPortalV2'

import { OrderingIcon } from '@icons'

const OrderBy = () => {
    const dropdownRef = useRef(null)
    const [showOptions, setShowOptions] = useState(false)

    const [order, setOrder] = useJobPortalV2Store(state => [state?.filters?.order, state?.setFilters?.order])

    if (showOptions)
        window.addEventListener('click', event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowOptions(false)
        })

    return (
        <div className='relative' ref={dropdownRef}>
            <Button
                label={`Order By : ${ORDER_BY_OPTIONS[order]}`}
                icon={OrderingIcon}
                fit
                fill={showOptions}
                classes='order-by !m-0 !py-1.5 !gap-1 !items-center !flex-grow !w-full'
                onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
                <div className='absolute right-0 w-max z-50 bg-white rounded border border-[#55bf84] shadow-md flex flex-col mt-2 text-sm'>
                    {Object.keys(ORDER_BY_OPTIONS).map(key => (
                        <button
                            key={key}
                            onClick={() => {
                                setOrder(key)
                                setShowOptions(false)
                            }}
                            className={`border-0 text-left hover:underline py-2 px-3 ${
                                key === order ? 'bg-[#4f9d9b] text-white' : null
                            }`}
                        >
                            {ORDER_BY_OPTIONS[key]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default memo(OrderBy)
