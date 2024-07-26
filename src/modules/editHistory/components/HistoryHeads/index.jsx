import { memo } from 'react'

import { EDIT_HISTORY_HEADS } from '@constants/editHistory'

const HistoryHeads = () => (
    <thead className='text-xs uppercase border border-[#048C8C]'>
        <tr>
            {EDIT_HISTORY_HEADS.map(heading => (
                <th scope='col' className='px-3 py-4' key={heading}>
                    {heading?.lg ? (
                        <>
                            {heading?.lg}
                            <span className='!text-xs !font-normal'>{heading?.sm}</span>
                        </>
                    ) : (
                        heading
                    )}
                </th>
            ))}
        </tr>
    </thead>
)

export default memo(HistoryHeads)
