import { memo } from 'react'

import { Button } from '@components'

import { DEFAULT_FILTER_VALS } from '@constants/analytics'

const FilterTypes = ({ vals = null, update = null }) =>
    vals && (
        <div className='-mt-14 absolute md:px-2 md:py-1 border bg-[#EDFDFB]'>
            <div className='flex flex-row gap-1 md:gap-8'>
                <Button
                    label='Quarterly'
                    fit
                    fill={vals.tab === 'quarterly'}
                    classes='border-0 rounded-none'
                    onClick={() => update({ ...DEFAULT_FILTER_VALS, tab: 'quarterly' })}
                />
                <Button
                    label='Monthly'
                    fit
                    fill={vals.tab === 'monthly'}
                    classes='border-0 rounded-none'
                    onClick={() => update({ ...DEFAULT_FILTER_VALS, tab: 'monthly' })}
                />
                <Button
                    label='Weekly'
                    fit
                    fill={vals.tab === 'weekly'}
                    classes='border-0 rounded-none'
                    onClick={() => update({ ...DEFAULT_FILTER_VALS, tab: 'weekly' })}
                />
                <Button
                    label='Custom Dates'
                    fit
                    fill={vals.tab === 'custom'}
                    classes='border-0 rounded-none'
                    onClick={() => update({ ...DEFAULT_FILTER_VALS, tab: 'custom' })}
                />
            </div>
        </div>
    )

export default memo(FilterTypes)
