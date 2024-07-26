import { memo } from 'react'

const EmptyTable = memo(({ cols = 1, msg = 'No data found!' }) => (
    <tr>
        <td colSpan={cols} className='text-center p-4'>
            {msg}
        </td>
    </tr>
))

export default EmptyTable
