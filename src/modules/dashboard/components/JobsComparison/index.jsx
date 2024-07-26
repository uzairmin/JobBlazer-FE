import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { StatsTitle } from '@modules/dashboard/components'

import { formatNum, isset } from '@utils/helpers'

import { UpIcon, UptoIcon, DownIcon } from '@icons'

const JobsComparison = ({ data = null }) =>
    isset(data) && (data?.current_count > 0 || data?.previous_count > 0) ? (
        <div className='pb-5 pl-2'>
            <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                <div className='flex flex-col tracking-widest w-full'>
                    <StatsTitle title='Jobs Stats' sub='Market Comparison of Jobs presense' />
                    <div className='inline-flex gap-4 items-center text-gray-700 pb-1 pt-3'>
                        Previous Month {UptoIcon} Current Month
                    </div>
                    <div className='inline-flex gap-4 items-center'>
                        <AnimatedNumber2
                            initialValue={0}
                            component='p'
                            value={data?.previous_count}
                            stepPrecision={0}
                            style={{ fontSize: 24 }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                        {UptoIcon}
                        <AnimatedNumber2
                            initialValue={0}
                            component='p'
                            value={data?.current_count}
                            stepPrecision={0}
                            style={{ fontSize: 24 }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                    </div>
                    <span
                        className={`inline-flex gap-4 pt-2.5  ${
                            data?.alteration === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {data?.percentage?.toFixed(2)} %<span>{data?.alteration === 'up' ? UpIcon : DownIcon}</span>
                    </span>
                </div>
            </div>
        </div>
    ) : null

export default memo(JobsComparison)
