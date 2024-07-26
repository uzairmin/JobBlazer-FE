import { forwardRef, memo, useMemo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

import { Tooltip as MyTooltip } from '@components'
import { JobTypesLegend } from '@modules/analytics/components'

import { htmlToPng } from '@utils/helpers'
import { JOB_TYPE_COLORS2 } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const MonthWiseJobTypes = forwardRef(({ data = [] }, ref) => {
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
        ref?.current?.style.removeProperty('width')
    }
    const dataKeys = useMemo(() => data?.at(0)?.data?.map(({ key, name }) => ({ key, name })) || [], [data])
    const memoizedData = useMemo(
        () =>
            data?.length > 0
                ? data?.reduce((result, monthData) => {
                      const monthObject = { month: monthData?.month }
                      monthData?.data?.forEach(item => {
                          monthObject[item?.key] = item?.value || 0
                      })
                      result.push(monthObject)
                      return result
                  }, [])
                : [],
        [data]
    )
    return memoizedData?.length > 0 ? (
        <div className='border px-2 pt-10 pb-10 text-[#1E6570] mt-10 relative' ref={ref}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Monthly Job Types
                <span className='text-sm hidden sm:inline-block'> - Charts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-4 sm:-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.add('hidden')
                    ref?.current?.style.setProperty('width', '1620px', 'important')
                    htmlToPng(ref?.current).then(() => postProcessing())
                }}
            >
                <MyTooltip text='Export to png'>{DownloadIcon2}Export</MyTooltip>
            </span>
            <div className='pt-7 sm:pt-0'>
                <JobTypesLegend dynamicTypes={dataKeys} />
            </div>
            <div className='overflow-x-auto'>
                <ResponsiveContainer minWidth={1590} height={750}>
                    <BarChart
                        height={300}
                        data={memoizedData}
                        margin={{ top: 15, bottom: 150, right: 10, left: 10 }}
                        barSize={10}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                            dataKey='month'
                            label={{ position: 'insideBottomRight' }}
                            angle={-20}
                            stroke='#037571'
                            interval={0}
                            textAnchor='end'
                            padding={{ left: 30 }}
                            style={{ textTransform: 'capitalize' }}
                            fontSize={17 - Math.round(memoizedData.length / 15)}
                        />
                        <YAxis
                            label={{ angle: -90, position: 'insideLeft' }}
                            stroke='#037571'
                            type='number'
                            tickCount={import.meta.env.VITE_MONTHLY_AND_QUARTERLY_YAXIS_TICKS ?? 10}
                            domain={[memoizedData?.min_value || 0, memoizedData?.max_value || 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                textTransform: 'capitalize',
                                borderRadius: 8,
                                border: '1px solid #4ab9a7',
                                fontSize: '13px',
                                fontWeight: 'bold',
                            }}
                        />
                        {dataKeys?.map(({ key }) => (
                            <Bar dataKey={key} fill={JOB_TYPE_COLORS2[key] || '#000000'} key={key} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
                <div className='items-end justify-end mr-4 py-4 hidden' ref={watermark}>
                    <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                    <img src={logo} alt='' width='120' height='120' />
                </div>
            </div>
        </div>
    ) : null
})

export default memo(MonthWiseJobTypes)
