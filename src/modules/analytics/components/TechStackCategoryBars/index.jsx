import { forwardRef, memo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList } from 'recharts'

import { Tooltip as MyTooltip } from '@components'
import { TechStackCategoryTooltip } from '@modules/analytics/components'

import { htmlToPng } from '@utils/helpers'
import { JOB_TYPES, JOB_TYPE_COLORS2 } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const TechStackCategoryBars = forwardRef(({ data = [] }, ref) => {
    const watermark = useRef('')

    const exportToPng = () => {
        const watermarkClasses = watermark?.current?.classList
        watermarkClasses.remove('hidden')
        watermarkClasses.add('flex')
        ref?.current?.style.setProperty('width', '1620px', 'important')
        htmlToPng(ref?.current).then(() => {
            watermarkClasses.remove('flex')
            watermarkClasses.add('hidden')
            ref?.current?.style.removeProperty('width')
        })
    }

    return data?.length > 0 ? (
        <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stack Category<span className='text-sm hidden sm:inline-block'> - Charts</span>
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={exportToPng}
            >
                <MyTooltip text='Export to png'>{DownloadIcon2}Export</MyTooltip>
            </span>
            <div ref={ref} className='pt-4' id='tech-stack-category-trends-bars'>
                <div className='w-full flex justify-end gap-6 px-3 flex-wrap'>
                    {Object.keys(JOB_TYPES)
                        .reverse()
                        .map((row, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <span style={{ backgroundColor: JOB_TYPE_COLORS2[row] }} className='px-4 py-1.5' />
                                <span>{JOB_TYPES[row]}</span>
                            </div>
                        ))}
                </div>
                <div className='flex flex-col overflow-x-auto'>
                    <ResponsiveContainer minWidth={1590} height={900}>
                        <BarChart
                            data={data}
                            margin={{ top: 40, bottom: 150, right: 10, left: 10 }}
                            barSize={40 - Math.round(data.length / 15)}
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis
                                dataKey='name'
                                label={{ position: 'insideBottomRight' }}
                                angle={-20}
                                stroke='#037571'
                                interval={0}
                                textAnchor='end'
                                padding={{ left: 30 }}
                                fontSize={16 - Math.round(data.length / 15)}
                            />
                            <YAxis
                                label={{ angle: -90, position: 'insideLeft' }}
                                stroke='#037571'
                                type='number'
                                domain={[0, 'auto']}
                            />
                            <Tooltip content={<TechStackCategoryTooltip />} />
                            {Object.keys(JOB_TYPES).map((row, idx) => (
                                <Bar dataKey={row} fill={JOB_TYPE_COLORS2[row]} stackId='a' key={idx}>
                                    {row === 'total' && (
                                        <LabelList dataKey={row} position='top' fill={JOB_TYPE_COLORS2[row]} />
                                    )}
                                </Bar>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                    <div className='items-end justify-end mr-4 py-2 hidden' ref={watermark}>
                        <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                        <img src={logo} alt='' width='120' height='120' />
                    </div>
                </div>
            </div>
        </div>
    ) : null
})

export default memo(TechStackCategoryBars)
