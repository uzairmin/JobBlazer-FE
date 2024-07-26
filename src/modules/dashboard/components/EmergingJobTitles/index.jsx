import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { StatsTitle } from '@modules/dashboard/components'

import { formatNum, isset } from '@utils/helpers'

import { UpIcon } from '@icons'

const EmergingJobTitles = ({ data = null }) =>
    isset(data) && data?.length > 0 ? (
        <div className='pb-5 pl-2'>
            <div className='border shadow-lg p-4 rounded-xl flex items-start h-full'>
                <div className='flex flex-col tracking-widest w-full'>
                    <StatsTitle
                        title='Emerging Job Titles'
                        sub='List of Top Emerged Job Titles of a month from `others`'
                    />
                    {data?.map((item, index) => (
                        <div className='flex items-center justify-between pt-3' key={index}>
                            <p className='text-opacity-50 capitalize'>{item?.title}</p>
                            <div className='inline-flex items-center gap-2 text-[#4f9d9b]'>
                                <span className='text-2xl'>~</span>
                                <AnimatedNumber2
                                    className='font-mono'
                                    initialValue={0}
                                    component='span'
                                    value={item?.count}
                                    stepPrecision={0}
                                    style={{ fontSize: 18 }}
                                    duration={1000}
                                    formatValue={n => formatNum(n)}
                                />
                                Jobs {UpIcon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null

export default memo(EmergingJobTitles)
