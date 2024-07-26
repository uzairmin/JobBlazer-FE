import { memo } from 'react'

import { Radio } from '@components'

const CronjobTyes = ({ types, set, onChange }) => (
    <div className='flex items-center gap-6'>
        <Radio
            name='type'
            value='time'
            label='Time Based'
            checked={types.time}
            onChange={e => {
                set({ interval: false, time: e.target.checked })
                onChange(e)
            }}
        />
        <Radio
            name='type'
            value='interval'
            label='Interval Based'
            checked={types.interval}
            onChange={e => {
                set({ time: false, interval: e.target.checked })
                onChange(e)
            }}
        />
    </div>
)

export default memo(CronjobTyes)
