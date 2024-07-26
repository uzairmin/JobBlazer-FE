import { memo, useMemo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts'

import { Tooltip } from '@components'

import { htmlToPng } from '@utils/helpers'
import { JOB_TYPES, JOB_TYPE_COLORS2 } from '@constants/analytics'

import { SearchClearIcon, DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const TechStackBars = ({ data = [], type = 'total', set = null, options = {} }) => {
    const barRef = useRef('')
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
        barRef?.current?.style.removeProperty('width')
    }
    const memoizedData = useMemo(() => data?.map(row => ({ name: row.name, [type]: row[type] })), [data, type])

    return memoizedData.length > 0 ? (
        <div className='border px-2 pt-10 pb-10 text-[#1E6570] mt-10 relative' ref={barRef}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                {options?.title ?? ''}
                <span className='text-sm'> - Charts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.add('hidden')
                    barRef?.current?.style.setProperty('width', '1620px', 'important')
                    htmlToPng(barRef?.current).then(() => postProcessing())
                }}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            {type !== 'total' && (
                <div className='mb-1 mr-3 cursor-pointer flex justify-end' onClick={() => set({ bar: 'total' })}>
                    <span className='text-sm pl-3 pr-2 border border-[#1E6570] rounded-full flex items-center'>
                        {JOB_TYPES[type]}
                        {SearchClearIcon}
                    </span>
                </div>
            )}
            <div className='overflow-x-auto'>
                <ResponsiveContainer minWidth={1590} height={750} id={options?.id}>
                    <BarChart height={300} data={memoizedData} margin={{ top: 15, bottom: 150, right: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                            dataKey='name'
                            label={{ position: 'insideBottomRight' }}
                            angle={-40}
                            stroke='#037571'
                            interval={0}
                            textAnchor='end'
                            allowDuplicatedCategory={false}
                            padding={{ left: 30 }}
                            fontSize={17 - Math.round(memoizedData.length / 15)}
                        />
                        <YAxis
                            label={{ angle: -90, position: 'insideLeft' }}
                            stroke='#037571'
                            type='number'
                            domain={[0, 'auto']}
                        />
                        {Object.keys(JOB_TYPES).map(
                            (row, index) =>
                                type === row && (
                                    <Bar
                                        dataKey={row}
                                        stackId='a'
                                        fill={JOB_TYPE_COLORS2[row] ?? '#000000'}
                                        key={index}
                                    >
                                        <LabelList
                                            dataKey={row}
                                            position='top'
                                            fontSize={options?.fs ?? 13}
                                            fontWeight='bold'
                                            fill={JOB_TYPE_COLORS2[row] ?? '#000000'}
                                        />
                                    </Bar>
                                )
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
}

export default memo(TechStackBars)
