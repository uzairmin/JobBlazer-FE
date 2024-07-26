import { memo } from 'react'

import { formatDate2 } from '@utils/helpers'
import { today } from '@constants/dashboard'

const DateRange = ({ start, end }) => (
    <div className='flex gap-x-4 md:gap-x-8 text-lg tracking-wider md:ml-3'>
        <div>
            <small className='text-sm'>From:</small> {formatDate2(start || today)}
        </div>
        <div>
            <small className='text-sm'>To:</small> {formatDate2(end || today)}
        </div>
    </div>
)

export default memo(DateRange)
