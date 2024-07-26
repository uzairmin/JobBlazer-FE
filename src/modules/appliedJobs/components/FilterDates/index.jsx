import { memo } from 'react'

import { Input } from '@components'

const FilterDates = ({ vals, update }) => (
    <>
        <div>
            <span className='text-xs font-semibold'>From Date</span>
            <Input
                type='date'
                onChange={({ target: { value } }) =>
                    update({ from: value, to: vals.to && value > vals.to ? value : vals.to })
                }
                value={vals.from}
                classes='bg-white h-10'
            />
        </div>
        <div>
            <span className='text-xs font-semibold'>To Date</span>
            <Input
                type='date'
                onChange={e => update({ to: e.target.value })}
                value={vals.to}
                min={vals.from}
                classes='bg-white h-10'
            />
        </div>
    </>
)

export default memo(FilterDates)
