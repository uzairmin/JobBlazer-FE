import { useState } from 'react'
import AnimatedNumber from 'react-animated-number'
import './style.css'
import { Button } from '@components'

import { formatNum } from '@utils/helpers'

import { JobsUploaderIcon, ScrapperIcon } from '@icons'

const ScraperAnalytics = ({ job_sources, total_scraped_jobs, total_uploaded_jobs }) => {
    const [uploadJobs, setUploadJobs] = useState(true)
    return (
        <div className='flex flex-row justify-center mt-8'>
            <div className='border border-1 p-4 m-2 -mr-6 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl mb-1 scraper_logs_icon'>{uploadJobs ? JobsUploaderIcon : ScrapperIcon}</p>
                    <h1 className='text-md font-bold'>
                        <AnimatedNumber
                            component='p'
                            initialValue={0}
                            value={uploadJobs ? total_uploaded_jobs : total_scraped_jobs}
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
                    <p>Total {uploadJobs ? 'Uploaded' : 'Scraped'} Jobs</p>
                </div>
            </div>
            <div className='flex flex-col bg-slate-100 py-4 rounded-3xl'>
                <div className='flex mx-2 px-2 ml-16 -mt-8 z-10'>
                    <Button
                        label='Total Scraped Jobs'
                        fit
                        fill={!uploadJobs}
                        classes={`md:pr-8 md:pl-6 text-lg shadow-xl rounded mx-4 ${
                            uploadJobs && 'border-gray-200 bg-[#EDFDFB]'
                        }`}
                        onClick={() => setUploadJobs(false)}
                    />
                    <Button
                        label='Total Uploaded Jobs'
                        fit
                        fill={uploadJobs}
                        classes={`md:pr-8 md:pl-6 text-lg shadow-xl rounded ${
                            !uploadJobs && 'border-gray-200 bg-[#EDFDFB]'
                        }`}
                        onClick={() => setUploadJobs(true)}
                    />
                </div>
                <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 items-center px-10  mt-4'>
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
                                            value={uploadJobs ? item?.total_uploaded_jobs : item?.total_scraper_jobs}
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
                                    <p className='text-sm'>{item.job_source.toUpperCase()}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default ScraperAnalytics
