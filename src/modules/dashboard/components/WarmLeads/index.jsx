import { BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts'

const WarmLeads = ({ data }) => (
    <div className='flex flex-col bg-white _shadow-1 rounded-xl overflow-x-auto md:overflow-x-visible w-screen md:w-full'>
        <ResponsiveContainer
            width='98%'
            height={450}
            minWidth={1000}
            className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto md:-mt-8'
        >
            <BarChart
                data={data}
                margin={{
                    top: 40,
                    right: 30,
                    left: 10,
                    bottom: 5,
                }}
            >
                <XAxis
                    dataKey='name'
                    label={{ position: 'insideBottomRight', offset: 0 }}
                    angle={-45}
                    stroke='#037571'
                    interval='preserveStart'
                    textAnchor='end'
                    padding={{ right: 5 }}
                    fontSize={14}
                />
                <YAxis
                    label={{ angle: -90, position: 'insideLeft' }}
                    stroke='#037571'
                    type='number'
                    domain={[0, 'auto']}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Legend
                    wrapperStyle={{
                        paddingTop: '35px',
                        marginTop: '15px',
                    }}
                />
                <Bar fill='#fcee8c' dataKey='warm' stackId='abc' barSize={15} />
                <Bar fill='#77b2f4' dataKey='cold' stackId='abc' barSize={15} />
            </BarChart>
        </ResponsiveContainer>
        <div className='text-[#006366] px-5 pt-5 pb-4'>
            <span className='text-lg'>Warm / Cold Leads</span>
            <hr className='w-[80%] h-0.5 bg-[#048C8C] my-3 border-0 rounded' />
            <span>This chart shows leads of warm and cold leads</span>
        </div>
    </div>
)

export default WarmLeads
