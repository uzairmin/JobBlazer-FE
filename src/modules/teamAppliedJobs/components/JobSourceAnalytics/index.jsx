import { useReducer } from 'react'
import AnimatedNumber from 'react-animated-number'

import { Button } from '@components'

import { HourlyChart } from '@modules/teamAppliedJobs/components'

import { formatNum } from '@utils/helpers'
import { TEAM_APPLIED_JOBS_STAT_TABS } from '@constants/teamAppliedJobs'

import { AppliedJobs as Jobs } from '@icons'

const JobSourceAnalytics = ({ job_sources, total, job_types, members }) => {
    const [tab, setTab] = useReducer((prev, next) => ({ ...prev, ...next }), TEAM_APPLIED_JOBS_STAT_TABS)

    return (
        <div className='flex flex-col md:flex-row justify-center mt-8 w-full'>
            <div className='flex flex-col justify-center items-center border border-1 p-4 m-2  md:-mr-8 text-center bg-[#EDFDFB] text-[#1E6570] rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-full md:w-48 z-10 '>
                <div className='flex flex-col justify-center items-center '>
                    <p className='text-2xl mb-1'>{Jobs}</p>
                    <h1 className='text-md font-bold '>
                        <AnimatedNumber
                            component='p'
                            initialValue={0}
                            value={total}
                            stepPrecision={0}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: 44,
                                transitionProperty: 'background-color, color, opacity',
                            }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                    </h1>
                    <p className='text-lg'>Total Applied Jobs</p>
                </div>

                <span
                    className='md:hidden text-sm rounded h-10 underline-offset-2 underline hover:font-bold'
                    onClick={() => setTab({ dropdown: !tab.dropdown })}
                >
                    {tab.dropdown ? 'Hide details' : 'Show details'}
                </span>
            </div>

            <div className={`flex-col bg-slate-100 py-4 rounded-3xl w-full ${!tab.dropdown ? 'hidden' : ''} md:flex`}>
                <div className='flex flex-row md:flex-row mx-2 px-2 ml-0 md:ml-16 md:-mt-8 z-10 gap-3'>
                    <Button
                        label='Job Sources'
                        fit
                        fill={tab.source}
                        classes={`md:pr-8 md:pl-6 shadow-xl rounded ${!tab.source && 'bg-[#EDFDFB] border-gray-300'}`}
                        onClick={() => setTab({ source: true, type: false, hourly: false })}
                    />
                    <Button
                        label='Job Types'
                        fit
                        fill={tab.type}
                        classes={`md:pr-8 md:pl-6 shadow-xl rounded ${!tab.type && 'bg-[#EDFDFB] border-gray-300'}`}
                        onClick={() => setTab({ source: false, type: true, hourly: false })}
                    />
                    <Button
                        label='Hourly Based Jobs'
                        fit
                        fill={tab.hourly}
                        classes={`md:pr-8 md:pl-6 shadow-xl rounded ${!tab.hourly && 'bg-[#EDFDFB] border-gray-300'}`}
                        onClick={() => setTab({ source: false, type: false, hourly: true })}
                    />
                </div>
                {tab.source || tab.type ? (
                    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 items-center px-10 mt-4'>
                        {job_sources &&
                            tab.source &&
                            job_sources.map((item, index) => (
                                <div
                                    className='lg:w-40 md:w-28 border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                                    key={index}
                                >
                                    <div>
                                        <h1 className='text-md font-bold'>
                                            <AnimatedNumber
                                                component='p'
                                                initialValue={0}
                                                value={item.total_job_source}
                                                stepPrecision={0}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 28,
                                                    transitionProperty: 'background-color, color, opacity',
                                                }}
                                                duration={1000}
                                                formatValue={n => formatNum(n)}
                                            />
                                        </h1>
                                        <p className='sm:text-xs md:text-xs text-sm '>
                                            {item.job__job_source.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {job_types &&
                            tab.type &&
                            job_types.map((item, index) => (
                                <div
                                    className='border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                                    key={index}
                                >
                                    <div>
                                        <h1 className='text-md font-bold'>
                                            <AnimatedNumber
                                                component='p'
                                                initialValue={0}
                                                value={item.total_job_type}
                                                stepPrecision={0}
                                                style={{
                                                    transition: '0.8s ease-out',
                                                    fontSize: 28,
                                                    transitionProperty: 'background-color, color, opacity',
                                                }}
                                                duration={1000}
                                                formatValue={n => formatNum(n)}
                                            />
                                        </h1>
                                        <p className='text-sm'>{item.job__job_type.toUpperCase()}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className='pl-0 md:pl-10 pr-4 mt-4 mb-2'>
                        <HourlyChart members={members} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobSourceAnalytics
