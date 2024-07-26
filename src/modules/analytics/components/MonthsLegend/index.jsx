import { memo } from 'react'
import { Tooltip } from 'react-tooltip'

import { isset } from '@utils/helpers'
import { MONTHS } from '@constants/analytics'

import { Checkedbox, unCheckedbox } from '@icons'

const MonthsLegend = ({ months = null, toggle = null }) => {
    const toggleMonth = month => {
        if (toggle) toggle(month)
    }

    return (
        <div className='w-full flex justify-end gap-6 px-2 flex-wrap'>
            {MONTHS.map(month => (
                <div
                    className={`flex gap-${isset(months) && isset(months?.[month.abr]) ? '1' : '2'} items-center`}
                    style={{ color: month.color }}
                    key={month.key}
                >
                    {isset(months) && isset(months?.[month.abr]) ? (
                        <>
                            <div
                                className='flex items-center cursor-pointer'
                                onClick={() => toggleMonth(month.abr)}
                                id={month.key}
                            >
                                <span className='px-2.5 py-[8.5px]' style={{ backgroundColor: month.color }} />
                                {months?.[month.abr] ? Checkedbox : unCheckedbox}
                            </div>
                            <Tooltip
                                content={`${months?.[month.abr] ? 'Hide' : 'Show'} - ${month.name} Data`}
                                anchorSelect={`#${month.key}`}
                                className='!px-2 !py-1 tracking-wider text-sm'
                            />
                        </>
                    ) : (
                        <span className='px-4 py-1.5' style={{ backgroundColor: month.color }} />
                    )}
                    <span>{month.name}</span>
                </div>
            ))}
        </div>
    )
}

export default memo(MonthsLegend)
