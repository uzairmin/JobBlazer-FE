import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { formatNum } from '@utils/helpers'

const JobCompanyCounts = ({ counts }) =>
    counts ? (
        <div className='flex items-center gap-2'>
            {Object.keys(counts).map((d, index) => (
                <div
                    className='border shadow-md py-1.5 px-3 bg-[#edfdfb] w-full cursor-pointer text-center'
                    key={index}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <p className='uppercase text-xs tracking-widest'>{d}</p>
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={counts[d]}
                                stepPrecision={0}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : null

export default memo(JobCompanyCounts)
