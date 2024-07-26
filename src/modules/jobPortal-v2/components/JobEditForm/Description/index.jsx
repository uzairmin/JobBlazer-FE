import { memo } from 'react'

import { TextEditor } from '@components'

const Description = ({ job, value, error = null, set }) => (
    <div className='w-full md:w-1/2'>
        <span className='font-semibold text-[#048c8c]'>Job Description*</span>
        <TextEditor
            init={job?.job_description_tags}
            value={value}
            onChange={text => set('job_description_tags', text)}
        />
        {error && <small className='__error'>{error}</small>}
    </div>
)

export default memo(Description)
