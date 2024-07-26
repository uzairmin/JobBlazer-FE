import { memo } from 'react'

import { Radio } from '@components'

const ResumeTyes = ({ type, setVals }) => (
    <div className='flex items-center gap-6 flex-wrap px-2'>
        <Radio
            name='type'
            value='automatic'
            label='Choose from templates'
            checked={type === 'automatic'}
            onChange={() => {
                setVals({ resumeType: 'automatic' })
            }}
        />
        <Radio
            name='type'
            value='manual'
            label='Upload yourself'
            checked={type === 'manual'}
            onChange={() => {
                setVals({ resumeType: 'manual' })
            }}
        />
    </div>
)

export default memo(ResumeTyes)
