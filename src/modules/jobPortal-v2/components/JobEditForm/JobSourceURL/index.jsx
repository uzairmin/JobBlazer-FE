import { memo } from 'react'

import { Input } from '@components'

const JobSourceURL = ({ value, error = null, onChange }) => (
    <div className='col-span-2'>
        <span className='text-xs font-semibold text-[#048c8c]'>Job Source URL*</span>
        <Input name='job_source_url' onChange={onChange} value={value} type='url' ph='Enter Job Source Link / URL' />
        {error && <small className='__error'>{error}</small>}
    </div>
)

export default memo(JobSourceURL)
