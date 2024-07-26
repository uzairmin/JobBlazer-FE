import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Text,
    ResponsiveContainer,
} from 'recharts'

function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
    return (
        <Text {...rest} verticalAnchor='middle' y={y + (y - cy) / 6} x={x + (x - cx) / 6}>
            {payload.value}
        </Text>
    )
}

const TechStacks = ({ data }) => (
    <div className='flex flex-col bg-white _shadow-1 rounded-xl overflow-x-auto md:overflow-x-visible w-screen md:w-full'>
        <ResponsiveContainer
            width='98%'
            height={700}
            minWidth={1000}
            className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto md:-mt-8'
        >
            <RadarChart outerRadius={250} data={data}>
                <PolarGrid stroke='#037571' strokeWidth='0.5' />
                <PolarAngleAxis
                    dataKey='name'
                    stroke='#037571'
                    strokeWidth='0.6'
                    tick={props => renderPolarAngleAxis(props)}
                    tickLine={false}
                />
                <Tooltip />
                <PolarRadiusAxis
                    angle={90}
                    domain={[0, 'auto']}
                    interval={3}
                    stroke='#00000'
                    orientation='middle'
                    fontSize={12}
                />
                <Radar
                    name='Tech Jobs'
                    dataKey='value'
                    stroke='#037571'
                    fill='#037571'
                    fillOpacity={0.2}
                    strokeWidth='1'
                />
            </RadarChart>
        </ResponsiveContainer>
        <div className='text-[#006366] px-5 pt-5 pb-4'>
            <span className='text-lg'>Tech Stacks</span>
            <hr className='w-[80%] h-0.5 bg-[#048C8C] my-3 border-0 rounded' />
            <span>This chart shows leads of different Technology Stacks</span>
        </div>
    </div>
)

export default TechStacks
