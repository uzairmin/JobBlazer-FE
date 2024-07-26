import { forwardRef, memo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

import { useAnalyticsStore } from '@/stores'

import { Tooltip as MyTooltip } from '@components'

import { MonthsLegend } from '@modules/analytics/components'

import { htmlToPng } from '@utils/helpers'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'
import { MONTHS } from '@/utils/constants/analytics'

const MonthlyCategories = forwardRef(({ data = [] }, ref) => {
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
        ref?.current?.style.removeProperty('width')
    }

    const [months, toggle] = useAnalyticsStore(state => [state?.category?.months, state?.toggleCategory?.months])

    return data?.data?.length > 0 ? (
        <div className='border px-2 pt-10 pb-10 text-[#1E6570] mt-10 relative' ref={ref}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Monthly Tech Stack Categories
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
                <MonthsLegend months={months} toggle={toggle} />
            </div>
            <div className='overflow-x-auto'>
                <ResponsiveContainer minWidth={1590} height={750}>
                    <BarChart
                        height={300}
                        data={data?.data}
                        margin={{ top: 15, bottom: 150, right: 10, left: 10 }}
                        barSize={10}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                            dataKey='category'
                            label={{ position: 'insideBottomRight' }}
                            angle={-20}
                            stroke='#037571'
                            interval={0}
                            textAnchor='end'
                            padding={{ left: 30 }}
                            style={{ textTransform: 'capitalize' }}
                            fontSize={17 - Math.round(data.data.length / 15)}
                        />
                        <YAxis
                            label={{ angle: -90, position: 'insideLeft' }}
                            stroke='#037571'
                            type='number'
                            tickCount={import.meta.env.VITE_MONTHLY_AND_QUARTERLY_YAXIS_TICKS ?? 10}
                            domain={[data?.min_value, data?.max_value]}
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
                        {MONTHS.map(
                            ({ key, color, abr }) => months?.[abr] && <Bar dataKey={key} fill={color} key={abr} />
                        )}
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

export default memo(MonthlyCategories)
