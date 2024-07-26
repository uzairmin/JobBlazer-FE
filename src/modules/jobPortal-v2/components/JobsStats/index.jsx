import React, { memo } from 'react'
import AnimatedNumber from 'react-animated-number'

import { useJobPortalV2Store } from '@/stores'

import { formatNum } from '@utils/helpers'
import { JOBS_STATS_TYPES } from '@constants/jobPortalV2'

const JobsStats = () => {
    const [stats] = useJobPortalV2Store(state => [state?.stats])

    return (
        <div className='flex gap-x-6 gap-y-2 flex-wrap justify-between md:grid md:grid-flow-col md:gap-0'>
            {Object.keys(JOBS_STATS_TYPES)?.map((type, index) => (
                <div className='flex flex-col gap-y-2' key={index}>
                    <AnimatedNumber
                        component='p'
                        initialValue={0}
                        value={Number(stats?.[type] || 0)}
                        stepPrecision={0}
                        style={{
                            transition: '0.8s ease-out',
                            fontSize: 20,
                            fontWeight: 'bolder',
                            transitionProperty: 'background-color, color, opacity',
                        }}
                        duration={1000}
                        formatValue={n => formatNum(n)}
                    />
                    <p className='tracking-wider'>{JOBS_STATS_TYPES?.[type]}</p>
                </div>
            ))}
        </div>
    )
}

export default memo(JobsStats)
