import { memo, useRef } from 'react'

import { Tooltip } from '@components'

import { formatNum, htmlToPng } from '@utils/helpers'
import { TECH_STACK_NUMBER_STYLE } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const TechStackCounts = ({ data = [], set = null, stack = null }) => {
    const statsRef = useRef('')
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
        statsRef?.current?.style.removeProperty('width')
    }
    return (
        <div className='border px-2 pt-10 pb-10 text-[#1E6570] mt-10 relative md:w-1/2' ref={statsRef}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stacks<span className='text-sm'> - Counts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.add('hidden')
                    statsRef?.current?.style.setProperty('width', '785px', 'important')
                    htmlToPng(statsRef?.current).then(() => postProcessing())
                }}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            {data?.length > 0 ? (
                <div className='md:p-4'>
                    <div className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4' id='tech-stack-counts'>
                        {data?.map((d, index) => (
                            <div
                                className={`border shadow-md pl-2 pr-3 py-2 ${
                                    stack === d.name ? 'bg-[#c4f5ed] border-cyan-300' : 'bg-[#edfdfb]'
                                } w-full cursor-pointer hover:bg-[#c4f5ed] hover:text-[#1E6570] `}
                                key={index}
                                onClick={() => set({ stack: d.name })}
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <span style={TECH_STACK_NUMBER_STYLE}>{formatNum(d.total)}</span>
                                        <p className='uppercase text-xs tracking-widest'>{d.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='items-end justify-end mr-4 py-4 hidden' ref={watermark}>
                        <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                        <img src={logo} alt='' width='120' height='120' />
                    </div>
                </div>
            ) : (
                <span className='italic ml-2'>No statics found yet</span>
            )}
        </div>
    )
}
export default memo(TechStackCounts)
