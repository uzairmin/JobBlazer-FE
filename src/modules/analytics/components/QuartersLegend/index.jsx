import { memo } from 'react'
import { Tooltip } from 'react-tooltip'

import { isset } from '@utils/helpers'
import { QUARTERS } from '@constants/analytics'

import { Checkedbox, unCheckedbox } from '@icons'

const QuartersLegend = ({ quarters = null, toggle = null, excluded = [] }) => {
    const toggleQuarter = quarter => {
        if (toggle) toggle(quarter)
    }
    const enabledQuarters = QUARTERS.filter(q => !excluded.includes(q.key))
    return (
        <div className='w-full flex justify-end gap-6 px-4 flex-wrap'>
            {enabledQuarters.map(quarter => (
                <div className='flex gap-2 items-center' style={{ color: quarter.color }} key={quarter.key}>
                    {isset(quarters) && isset(quarters?.[quarter.key]) ? (
                        <>
                            <div
                                className='flex items-center cursor-pointer'
                                onClick={() => toggleQuarter(quarter.key)}
                                id={quarter.key}
                            >
                                <span className='px-3.5 py-[8.5px]' style={{ backgroundColor: quarter.color }} />
                                {quarters?.[quarter.key] ? Checkedbox : unCheckedbox}
                            </div>
                            <Tooltip
                                content={`${quarters?.[quarter.key] ? 'Hide' : 'Show'} - ${quarter.name} Data`}
                                anchorSelect={`#${quarter.key}`}
                                className='!px-2 !py-1 tracking-wider text-sm'
                            />
                        </>
                    ) : (
                        <span className='px-4 py-1.5' style={{ backgroundColor: quarter.color }} />
                    )}
                    <span>{quarter.name}</span>
                </div>
            ))}
        </div>
    )
}

export default memo(QuartersLegend)
