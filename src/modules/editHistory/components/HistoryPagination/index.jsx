import { memo } from 'react'

import { Paginated } from '@components'

const HistoryPagination = ({ data = null, set = null, page = 1 }) =>
    data?.pages > 1 && (
        <div className='w-full flex justify-center'>
            <Paginated pages={data?.pages} setPage={set} page={page} />
        </div>
    )

export default memo(HistoryPagination)
