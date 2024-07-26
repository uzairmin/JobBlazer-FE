import { memo } from 'react'

const EmptyTable = memo(() => (
    <tr>
        <td colSpan={10} className='text-center p-4'>
            No Applied Jobs found yet!
        </td>
    </tr>
))

export default EmptyTable
