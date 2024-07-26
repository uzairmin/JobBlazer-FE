import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { StatsTitle } from '@modules/dashboard/components'

import { formatNum, isset } from '@utils/helpers'

import { UpIcon, UptoIcon, DownIcon } from '@icons'

const DecliningSources = ({ data = null, relative = true }) =>
    isset(data) && data?.length > 0 ? (
        <div className='pb-5 pl-2'>
            <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                <div className='flex flex-col tracking-widest w-full'>
                    <StatsTitle
                        title='Declining Job Sources'
                        sub={`${relative ? 'List of' : 'Relative Comparison of'} Declined Job Sources ${
                            relative ? 'among two months' : 'for a month'
                        }`}
                    />
                    {data?.map((item, index) => (
                        <div className='flex items-center justify-between pt-3' key={index}>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-[#e06767] uppercase'>{item?.source}</p>
                                <div className='inline-flex gap-3 text-slate-700'>
                                    <AnimatedNumber2
                                        initialValue={0}
                                        component='span'
                                        value={item?.previous_count}
                                        stepPrecision={0}
                                        style={{ fontSize: 12 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                    {UptoIcon}
                                    <AnimatedNumber2
                                        initialValue={0}
                                        component='span'
                                        value={item?.current_count}
                                        stepPrecision={0}
                                        style={{ fontSize: 12 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                </div>
                            </div>
                            <span
                                className={`inline-flex gap-4 pt-2.5  ${
                                    item?.alteration === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}
                            >
                                {item?.percentage?.toFixed(2)} %
                                <span>{item?.alteration === 'up' ? UpIcon : DownIcon}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null

export default memo(DecliningSources)
