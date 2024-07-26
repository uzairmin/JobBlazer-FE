import { memo } from 'react'

import { formatDate } from '@utils/helpers'

const ApplyHistory = ({ history }) => (
    <div className='flex flex-col bg-white border p-3 space-y-1 mb-4'>
        <p className='text-lg'>Job Apply History</p>
        <table className='table-auto text-sm text-left text-gray-500'>
            <thead className='text-xs uppercase border'>
                <tr>
                    <th className='pl-2 py-2'>Vertical</th>
                    <th className='pl-2 py-2'>Team</th>
                    <th className='pl-2 py-2'>Applied At</th>
                </tr>
            </thead>
            <tbody>
                {history?.map((item, index) => (
                    <tr key={index}>
                        <td className='pl-2 py-2'>
                            {item.vertical} | {item.pseudo}
                        </td>
                        <td className='pl-2 py-2'>{item.team}</td>
                        <td className='pl-2 py-2'>{formatDate(item.time)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default memo(ApplyHistory)
