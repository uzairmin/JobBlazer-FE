import { memo } from 'react'

const EmptyTable = memo(() => (
    <tr>
        <td colSpan={9} className='text-center p-4'>
            No team Applied Jobs found yet!
        </td>
    </tr>
))

export default EmptyTable
