import AnimatedNumber from 'react-animated-number'

import { formatNum } from '@utils/helpers'

import { LeadManagementIcon } from '@icons'

const LeadsAnalytics = ({ data }) => {
    const total = data[0]
    const leads = data.slice(1)
    return (
        <div className='flex flex-col md:flex-row justify-center mt-8 w-full place-items-center'>
            <div className='border border-1 p-4 m-2 -mr-6 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl mb-1 scraper_logs_icon'>{LeadManagementIcon}</p>
                    <h1 className='text-md font-bold'>
                        <AnimatedNumber
                            component='p'
                            initialValue={0}
                            value={total?.value}
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
                    <p>Total Leads</p>
                </div>
            </div>
            <div className='flex flex-col bg-slate-100 py-4 rounded-3xl'>
                <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 items-center px-10 mt-4'>
                    {leads &&
                        leads?.map((item, index) => (
                            <div
                                className='border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                                key={index}
                            >
                                <div>
                                    <h1 className='text-sm'>
                                        <AnimatedNumber
                                            component='p'
                                            initialValue={0}
                                            value={item?.value}
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
                                    <p className='text-lg font-semibold uppercase mt-2'>{item?.name}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default LeadsAnalytics
