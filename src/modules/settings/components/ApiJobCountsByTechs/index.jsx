import { memo } from 'react'

import { useApiJobCountsByTechStore } from '@/stores'

import { Modal } from '@components'

import { formatDate2, isset } from '@utils/helpers'

import { FromIcon, UptoIcon, CodeIcon, DateTimeIcon } from '@icons'
import { today } from '@/utils/constants/dashboard'

const ApiJobCountsByTechs = ({ counts }) => {
    const [dates, type, show, setShow] = useApiJobCountsByTechStore(state => [
        state?.dates,
        state?.type,
        state?.show,
        state?.setShow,
    ])
    return (
        show && (
            <Modal
                classes='md:!w-[90%] lg:!w-[60%]'
                show={show}
                setShow={setShow}
                content={
                    <div className='pt-2 w-full'>
                        <div className='flex flex-col overflow-y-scroll text-slate-700'>
                            <p className='text-xl'>Job Counts by Tech Stacks for API Logs</p>
                            <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between mt-1.5'>
                                <p className='text-slate-500'>
                                    {type === 's2p' ? (
                                        <span className='inline-flex items-center gap-3'>
                                            Staging {FromIcon} Production
                                        </span>
                                    ) : (
                                        <span className='inline-flex items-center gap-3'>
                                            Production <span className='text-lg font-bold'>{FromIcon}</span> Sales
                                            Engine
                                        </span>
                                    )}
                                </p>
                                <span className='inline-flex items-center gap-3 text-sm'>
                                    <span className='text-slate-500'>{DateTimeIcon}</span>
                                    {formatDate2(dates?.start ?? '2022-12-08')}
                                    {UptoIcon}
                                    {formatDate2(dates?.end ?? today)}
                                </span>
                            </div>
                            <hr className='mt-2 mb-4' />
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
                                {isset(counts) && counts ? (
                                    <>
                                        <div className='flex items-center justify-evenly border border-neutral-400 tracking-wider px-4 py-2 lg:col-span-3 md:col-span-2'>
                                            <span className='inline-flex items-center gap-3'>
                                                <span className='text-xl text-slate-500'>{CodeIcon}</span> Primary Tech
                                                Stacks
                                            </span>
                                        </div>
                                        {Object.keys(counts)?.map((row, idx) => (
                                            <div
                                                className='flex items-center justify-between border px-4 py-2'
                                                key={idx}
                                            >
                                                <span>{row}</span>
                                                <span className='font-mono font-semibold'>{counts?.[row]}</span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className='lg:col-span-3 md:col-span-2 mx-auto p-3 italic'>
                                        Not data regarding tech stacks available right now, Only
                                        <strong className='ml-1'>Overall Count</strong> is available in Logs.
                                    </div>
                                )}
                            </div>
                            <small className='italic font-semibold text-slate-500 tracking-wide mt-2'>
                                # Data related Tech stacks only be available from Dec 08, 2023 to onwards
                            </small>
                        </div>
                    </div>
                }
            />
        )
    )
}

export default memo(ApiJobCountsByTechs)
