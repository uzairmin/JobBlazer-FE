import { useState } from 'react'
import AnimatedNumber from 'react-animated-number'

import { useApiJobCountsByTechStore } from '@/stores'

import { Button } from '@components'

import { ApiJobCountsByTech } from '@modules/settings/components'

import { convertToTitleCase, formatNum, parseAnalytics } from '@utils/helpers'

import { JobsUploaderIcon } from '@icons'

const ApiLogsAnalytics = ({ stats }) => {
    const [type, show, toggleShow, setType] = useApiJobCountsByTechStore(state => [
        state?.type,
        state?.show,
        state?.setShow,
        state?.setType,
    ])

    const [s2P, setS2P] = useState(type === 'p2s')
    const [stat, setStats] = useState(parseAnalytics(stats?.production_to_sales_engine))

    const setAnalytics = val => {
        if (val === 's2P') {
            setS2P(false)
            setStats(parseAnalytics(stats?.stagging_to_production))
        } else {
            setS2P(true)
            setStats(parseAnalytics(stats?.production_to_sales_engine))
        }
        setType(val === 's2P' ? 's2p' : 'p2s')
    }
    return (
        <div className='flex flex-row justify-center mt-8'>
            <div className='border border-1 p-4 m-2 -mr-6 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl mb-1 scraper_logs_icon'>{JobsUploaderIcon}</p>
                    <h1 className='text-md font-bold'>
                        <AnimatedNumber
                            component='p'
                            initialValue={0}
                            value={
                                s2P
                                    ? stats?.production_to_sales_engine?.total_hits
                                    : stats?.stagging_to_production?.total_hits
                            }
                            stepPrecision={0}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: 40,
                                transitionProperty: 'background-color, color, opacity',
                            }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                    </h1>
                    <span
                        className='pt-2 underline underline-offset-4 italic cursor-pointer'
                        onClick={() => toggleShow()}
                    >
                        See Details
                    </span>
                </div>
            </div>
            <div className='flex flex-col bg-slate-100 py-4 rounded-3xl'>
                <div className='flex mx-2 px-2 ml-16 -mt-8 z-10'>
                    <Button
                        label='Staging --> Production'
                        fit
                        fill={!s2P}
                        classes={`md:pr-8 md:pl-6 text-lg shadow-xl rounded mx-4 ${
                            s2P && 'border-gray-200 bg-[#EDFDFB]'
                        }`}
                        onClick={() => setAnalytics('s2P')}
                    />
                    <Button
                        label='Production --> Sales Engine'
                        fit
                        fill={s2P}
                        classes={`md:pr-8 md:pl-6 text-lg shadow-xl rounded ${!s2P && 'border-gray-200 bg-[#EDFDFB]'}`}
                        onClick={() => setAnalytics('p2SE')}
                    />
                </div>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 items-center px-10  mt-4'>
                    {stat?.length > 0 &&
                        stat?.map(
                            (item, index) =>
                                item[0] !== 'total_techStackWise_jobs' && (
                                    <div
                                        className='truncate break-words border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                                        key={index}
                                    >
                                        <div>
                                            <h1 className='text-md font-bold'>
                                                <AnimatedNumber
                                                    component='p'
                                                    initialValue={0}
                                                    value={item[1]}
                                                    stepPrecision={0}
                                                    style={{
                                                        transition: '0.8s ease-out',
                                                        fontSize: 22,
                                                        transitionProperty: 'background-color, color, opacity',
                                                    }}
                                                    duration={1000}
                                                    formatValue={n => formatNum(n)}
                                                />
                                            </h1>
                                            <p className='tracking-wider text-sm whitespace-pre-line'>
                                                {convertToTitleCase(item[0])}
                                            </p>
                                        </div>
                                    </div>
                                )
                        )}
                </div>
            </div>
            {show && <ApiJobCountsByTech counts={stat?.at(-1)?.at(1)} />}
        </div>
    )
}
export default ApiLogsAnalytics
