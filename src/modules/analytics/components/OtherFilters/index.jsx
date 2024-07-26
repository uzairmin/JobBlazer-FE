import { memo, useState } from 'react'

import { Button, Input } from '@components'

import { StacksDropdown } from '@modules/analytics/components'

import { isset } from '@utils/helpers'

import { OtherFiltersIcon, AllowLeadIcon, RemoveExposedToIcon } from '@icons'

const OtherFilters = ({ values = {}, update = null, apply = null }) => {
    const [showOptions, setShowOptions] = useState(false)

    return (
        isset(values) &&
        isset(update) && (
            <div className='relative'>
                <Button
                    label='Other Filters'
                    icon={OtherFiltersIcon}
                    fit
                    fill={showOptions}
                    classes='!items-center !w-full !m-0 !pr-3 !py-2.5 !rounded-full'
                    onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                    <div className='absolute -right-16 md:right-0 w-80 md:w-96 md:min-w-max z-50 bg-white rounded border border-[#4ab9a7] shadow-2xl mt-3'>
                        <div className='flex flex-col gap-3 p-3.5'>
                            <p className='ml-1 text-lg md:text-xl tracking-wider'>Utility Filters</p>
                            <div className='flex flex-col gap-1'>
                                <small className='ml-1 md:tracking-wider'>Select Tech Stack(s) to Exclude</small>
                                <StacksDropdown value={values.excluded} update={update} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <small className='ml-1 md:tracking-wider'>Enter percentage to compensate values</small>
                                <Input
                                    ph='Percent'
                                    type='number'
                                    onChange={e =>
                                        e?.target?.value === '' ||
                                        (!isNaN(parseFloat(e?.target?.value)) &&
                                            e?.target?.value >= 0 &&
                                            e?.target?.value <= 1000)
                                            ? update({ percent: e?.target?.value })
                                            : null
                                    }
                                    value={values.percent}
                                    min={0}
                                    max={1000}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <small className='ml-1 md:tracking-wider'>Enter Keywords to Search</small>
                                <Input
                                    ph='Enter Keywords'
                                    onChange={e => update({ query: e.target.value })}
                                    value={values.query}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <small className='ml-1'>
                                    <span className='md:tracking-wide'>Enter Minimum Jobs Count</span> (equal or greater
                                    than value)
                                </small>
                                <Input
                                    ph='Enter Minimum Value'
                                    type='number'
                                    onChange={e => update({ minimum: parseInt(e.target.value || 0) })}
                                    value={values.minimum}
                                />
                            </div>
                            {apply && (
                                <div className='flex gap-4 items-center md:my-1.5'>
                                    <Button
                                        onClick={apply}
                                        icon={AllowLeadIcon}
                                        classes='gap-2 !rounded-full'
                                        label='Apply'
                                    />
                                    <Button
                                        onClick={() => setShowOptions(false)}
                                        icon={RemoveExposedToIcon}
                                        classes='!pl-2 !pr-3 !gap-1 !rounded-full !text-gray-700 bg-slate-200 !border-slate-400 hover:!bg-slate-300 hover:!text-black'
                                        label='Cancel'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    )
}

export default memo(OtherFilters)
