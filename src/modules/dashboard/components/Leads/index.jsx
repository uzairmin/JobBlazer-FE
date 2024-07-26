import { memo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { SelectBox } from '@components'

import { parseStats } from '@utils/helpers'

const Leads = ({ data, stats }) => {
    const [selectedOption, setSelectedOption] = useState({ value: 'total', label: 'Total' })

    const handleChange = value => setSelectedOption(value)

    return (
        <div className='flex flex-col bg-white _shadow-1 rounded-xl overflow-x-auto md:overflow-x-visible w-screen md:w-full'>
            <ResponsiveContainer
                width='98%'
                height={550}
                minWidth={1000}
                className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto md:-mt-8'
            >
                <LineChart data={data} margin={{ top: 40, bottom: 100, right: 30, left: 30 }}>
                    <CartesianGrid stroke='#037571' strokeDasharray='3 3' />
                    <XAxis
                        dataKey='name'
                        label={{ position: 'insideBottomRight' }}
                        angle={-40}
                        stroke='#037571'
                        interval={0}
                        textAnchor='end'
                        axisLine={false}
                        allowDuplicatedCategory={false}
                        padding={{ left: 30 }}
                        fontSize={17 - Math.round(data.length / 15)}
                    />
                    <YAxis
                        label={{ angle: -90, position: 'insideLeft' }}
                        stroke='#037571'
                        type='number'
                        axisLine={false}
                        domain={[0, 'auto']}
                    />
                    <Tooltip />
                    <Line
                        dataKey={selectedOption.value}
                        stroke='#048C8C'
                        strokeWidth='2'
                        dot={{ stroke: '#048C8C', strokeWidth: 4, r: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            <div className='flex justify-between px-5 pt-5 pb-4'>
                <div className='text-[#006366] w-full sm:w-5/6'>
                    <span className='text-lg'>Leads</span>
                    <hr className='w-[80%] h-0.5 bg-[#048C8C] my-3 border-0 rounded' />
                    <span>This chart shows total, prospects, warm, cold, hot, hired, and rejected leads</span>
                </div>
                <div className='text-[#006366] w-full sm:w-1/6 sm:pl-2'>
                    <SelectBox
                        options={parseStats(stats)}
                        selected={selectedOption}
                        handleChange={handleChange}
                        className='text-lg'
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Leads)
