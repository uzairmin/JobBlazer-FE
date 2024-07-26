import { JOB_TYPES } from '@constants/analytics'

const TechStackCategoryTooltip = ({ active, payload: bar }) => {
    if (active && bar && bar.length) {
        return (
            <div className='flex flex-col border border-slate-300 bg-[#edfffb] text-[#2d455c] p-2 rounded-lg shadow-lg italic'>
                {Object.keys(JOB_TYPES)
                    .filter(row => row !== 'total')
                    .map((row, index) => (
                        <small key={index} className='flex items-center justify-between gap-4'>
                            <span>{`${JOB_TYPES[row]}`}</span>
                            <strong>
                                {(((bar[0]?.payload?.[row] ?? 0) / (bar[0]?.payload?.total ?? 0)) * 100).toFixed(2)} %
                            </strong>
                        </small>
                    ))}
            </div>
        )
    }
    return null
}

export default TechStackCategoryTooltip
