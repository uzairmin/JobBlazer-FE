import { memo, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import { Tooltip } from '@components'

import { htmlToPng } from '@utils/helpers'
import { JOB_TYPE_COLORS2 } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const JobTypePies = ({ data }) => {
    const chartRef = useRef('')
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
        chartRef?.current?.style.removeProperty('width')
    }
    const renderCustomizedLabel = ({ percent, payload }) => `${payload.name} (${(percent * 100).toFixed(2)}%)`
    // `${formatNum(payload.value)} ${payload.name} (${(percent * 100).toFixed(2)}%)`

    return (
        <div className='border md:px-2 h-full pt-10 pb-10 text-[#1E6570] mt-10 relative md:w-1/2' ref={chartRef}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest ml-2'>
                Job Types<span className='text-sm'> - Charts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.add('hidden')
                    chartRef?.current?.style.setProperty('width', '885px', 'important')
                    htmlToPng(chartRef?.current).then(() => postProcessing())
                }}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            <div className='flex flex-col overflow-x-auto'>
                <ResponsiveContainer minWidth={785} height={400} id='job-type-pies'>
                    <PieChart className='mx-auto'>
                        <Pie
                            data={data?.filter(({ value }) => value > 0)}
                            label={renderCustomizedLabel}
                            outerRadius={130}
                            dataKey='value'
                            animationBegin={0}
                            animationDuration={300}
                        >
                            {data
                                ?.filter(({ value }) => value > 0)
                                ?.map((row, index) => (
                                    <Cell key={`cell-job-type-${index}`} fill={JOB_TYPE_COLORS2[row.key]} />
                                ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className='items-end mt-4 justify-end mr-4 py-2 hidden' ref={watermark}>
                    <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                    <img src={logo} alt='' width='120' height='120' />
                </div>
            </div>
        </div>
    )
}

export default memo(JobTypePies)
