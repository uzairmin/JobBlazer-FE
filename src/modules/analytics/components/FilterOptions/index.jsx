import { memo } from 'react'

import { Input, Radio, CustomSelector } from '@components'

import { getYearsOptions } from '@utils/helpers'

const FilterOptions = ({ vals = null, update = null }) =>
    vals && (
        <>
            {vals.tab === 'custom' && (
                <>
                    <div>
                        <span className='text-xs pl-1'>From Date</span>
                        <Input
                            type='date'
                            onChange={({ target: { value } }) =>
                                update({
                                    from: value,
                                    to: vals.to.length === 0 || value > vals.to ? value : vals.to,
                                })
                            }
                            value={vals.from}
                            classes='lg:!w-56'
                        />
                    </div>
                    <div>
                        <span className='text-xs pl-1'>To Date</span>
                        <Input
                            type='date'
                            onChange={e => update({ to: e.target.value })}
                            value={vals.to}
                            min={vals.from}
                            classes='lg:!w-56'
                        />
                    </div>
                </>
            )}
            {vals.tab === 'weekly' && (
                <div>
                    <span className='text-xs pl-1'>Week</span>
                    <Input
                        type='week'
                        onChange={e => update({ week: e.target.value })}
                        value={vals.week}
                        classes='lg:!w-56'
                    />
                </div>
            )}
            {vals.tab === 'monthly' && (
                <div>
                    <span className='text-xs pl-1'>Month</span>
                    <Input
                        type='month'
                        onChange={e => update({ month: e.target.value })}
                        value={vals.month}
                        classes='lg:!w-56'
                    />
                </div>
            )}
            {vals.tab === 'quarterly' && (
                <>
                    <div>
                        <span className='text-xs pl-1'>Select Year</span>
                        <div className='w-32 md:w-48 lg:!w-56'>
                            <CustomSelector
                                options={getYearsOptions()}
                                handleChange={({ value }) => update({ year: value })}
                                selectorValue={{ value: vals.year, label: vals.year }}
                            />
                        </div>
                    </div>
                    {vals.year && (
                        <div>
                            <span className='text-xs pl-1'>Choose quarter</span>
                            <div className='flex flex-wrap gap-2 md:gap-8 my-2'>
                                {[...Array(4)].map((_, i) => (
                                    <Radio
                                        key={i}
                                        name='quarter'
                                        checked={vals.quarter === `q${i + 1}`}
                                        value={`q${i + 1}`}
                                        label={`Q ${i + 1}`}
                                        onChange={e => update({ quarter: e.target.value })}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )

export default memo(FilterOptions)
