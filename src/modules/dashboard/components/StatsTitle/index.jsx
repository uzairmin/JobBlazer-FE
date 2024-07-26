import { memo } from 'react'

const StatsTitle = ({ title = 'Statistics', sub = 'Listing of Stats' }) => (
    <>
        <p className='text-2xl text-gray-700 border-b'>{title}</p>
        <small className='text-gray-600 -skew-x-[5deg] my-1'>{sub}</small>
    </>
)

export default memo(StatsTitle)
