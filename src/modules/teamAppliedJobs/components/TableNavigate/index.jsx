import { memo } from 'react'

import { Limits, Pagination } from '@components'

const TableNavigate = memo(({ data, page, handleClick }) => {
    const from = 12 * (page - 1) + 1
    const to = from + data.jobs.length - 1

    return (
        <nav className='flex items-center justify-between p-4' aria-label='Table navigation'>
            <Limits total={data?.total} from={from} to={to} />
            <Pagination handleClick={handleClick} next={!data?.next} prev={!data?.prev} />
        </nav>
    )
})

export default TableNavigate
