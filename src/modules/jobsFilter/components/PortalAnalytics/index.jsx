import AnimatedNumber from 'react-animated-number'

import { formatNum } from '@utils/helpers'

import { AppliedJobs as Jobs } from '@icons'

const JobPortalAnalytics = ({ job_sources, total }) => (
    <div className='flex flex-row justify-center'>
        <div className='border border-1 p-4 m-2 text-center  bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-2xl mb-1'>{Jobs}</p>
                <h1 className='text-md font-bold'>
                    <AnimatedNumber
                        component='p'
                        initialValue={0}
                        value={Number(total)}
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
                <p className='text-lg'>Total Jobs</p>
            </div>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 items-center px-10 bg-slate-100 py-4 rounded-3xl -ml-8'>
            {job_sources &&
                job_sources.map((item, index) => (
                    <div
                        className='border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                        key={index}
                    >
                        <div>
                            <h1 className='text-md font-bold'>
                                <AnimatedNumber
                                    component='p'
                                    initialValue={0}
                                    value={Number(item.count)}
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
                            <p className='text-sm'>{item.type.toUpperCase()}</p>
                        </div>
                    </div>
                ))}
        </div>
    </div>
)
export default JobPortalAnalytics
