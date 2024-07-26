import { memo, useRef } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    Label,
    LabelList,
} from 'recharts'

import { Tooltip as MyTooltip } from '@components'

import { htmlToPng } from '@utils/helpers'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const StockMarketChart = ({ data = [] }) => {
    const chartRef = useRef('')
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
        chartRef?.current?.style.removeProperty('width')
    }

    const lastDataPoint = data[data.length - 1]
    const arrowColor = lastDataPoint.jobs >= data[data.length - 2].jobs ? 'green' : 'red'

    return (
        <div className='border px-2 pt-10 pb-10 mt-10 relative text-[#1E6570]' ref={chartRef}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Jobs Trends<span className='text-sm'> - Market</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.add('hidden')
                    chartRef?.current?.style.setProperty('width', '1620px', 'important')
                    htmlToPng(chartRef?.current).then(() => postProcessing())
                }}
            >
                <MyTooltip text='Export to png'>{DownloadIcon2}Export</MyTooltip>
            </span>
            <div className='overflow-x-auto'>
                <ResponsiveContainer minWidth={1590} height={400} id='jobs-trends-chart'>
                    <LineChart data={data} margin={{ right: 35, top: 20 }}>
                        <CartesianGrid strokeDasharray='12 12' />
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type='linear'
                            dataKey='jobs'
                            stroke='#4ab9a7'
                            activeDot={{ r: 10 }}
                            dot={{ r: 7 }}
                            strokeWidth={4}
                            strokeOpacity={0.7}
                        >
                            <LabelList dataKey='jobs' position='insideTopLeft' fill='black' />
                        </Line>
                        <ReferenceLine y={lastDataPoint.jobs} stroke={arrowColor} strokeDasharray='3 3'>
                            <Label value={lastDataPoint.jobs} position='top' fill={arrowColor} />
                            <Label
                                value={arrowColor === 'green' ? '\u25B2' : '\u25BC'}
                                position='bottom'
                                fill={arrowColor}
                            />
                        </ReferenceLine>
                    </LineChart>
                </ResponsiveContainer>
                <div className='items-end justify-end mr-4 py-4 hidden' ref={watermark}>
                    <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                    <img src={logo} alt='' width='120' height='120' />
                </div>
            </div>
        </div>
    )
}

export default memo(StockMarketChart)
