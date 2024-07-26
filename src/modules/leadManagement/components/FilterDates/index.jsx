import { memo } from 'react'

import { Input } from '@components'

const FilterDates = ({ vals, update }) => (
    <>
        <div>
            <span className='text-xs font-semibold'>From Date</span>
            <Input
                type='date'
                onChange={({ target: { value } }) =>
                    update({ start: value, end: vals.end && value > vals.end ? value : vals.end })
                }
                value={vals.start}
                classes='bg-white h-10'
            />
        </div>
        <div>
            <span className='text-xs font-semibold'>To Date</span>
            <Input
                type='date'
                onChange={e => update({ end: e.target.value })}
                value={vals.end}
                min={vals.start}
                classes='bg-white h-10'
            />
        </div>
    </>
)

export default memo(FilterDates)
