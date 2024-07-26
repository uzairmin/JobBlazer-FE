import { memo, useMemo } from 'react'

import { CustomSelector } from '@components'

import { parseJobType2 } from '@utils/helpers'
import { JOB_TYPES_OPTIONS_SMALLCASE } from '@constants/scrapper'

const JobTypesDropdown = ({ value, error, set }) => {
    const renderJobTypes = useMemo(() => (
        <CustomSelector
            options={JOB_TYPES_OPTIONS_SMALLCASE}
            selectorValue={parseJobType2(value)}
            handleChange={e => set('job_type', e.value)}
            placeholder='Select job type'
        />
    ))

    return (
        <div className='z-30'>
            <span className='text-xs font-semibold text-[#048c8c]'>Job Type*</span>
            {renderJobTypes}
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(JobTypesDropdown)
