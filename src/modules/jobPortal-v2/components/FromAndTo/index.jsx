import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const FromAndTo = () => {
    const [from, to, setFrom, setTo] = useJobPortalV2Store(state => [
        state?.filters?.from,
        state?.filters?.to,
        state?.setFilters?.from,
        state?.setFilters?.to,
    ])

    return (
        <div className='w-full'>
            From - To
            <hr className='mb-3 bg-slate-300 h-0.5' />
            <div className='flex items-center gap-1'>
                <input
                    className='w-full p-2 text-sm text-gray-500 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 peer !bg-gray-50'
                    type='date'
                    max={new Date().toISOString().slice(0, 10)}
                    value={from}
                    onChange={event => setFrom(event.target.value)}
                />
                <input
                    className='p-2 w-full text-sm text-gray-500 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 peer !bg-gray-50'
                    type='date'
                    max={new Date().toISOString().slice(0, 10)}
                    value={to}
                    onChange={event => setTo(event.target.value)}
                />
            </div>
        </div>
    )
}

export default memo(FromAndTo)
