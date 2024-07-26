import { memo } from 'react'

const StatCard = memo(({ value, label }) => (
    <div className='rounded-lg shadow-md bg-slate-100 border border-slate-300 h-fit'>
        <div className='flex flex-col items-center p-4'>
            <p className='mb-1 text-lg font-semibold uppercase text-[#048C8C]'>{label || 'N/A'}</p>
            <span className='text-lg text-[#0EB3AD]'>{value}</span>
        </div>
    </div>
))

export default StatCard
