import { memo, useMemo } from 'react'

import { CustomSelector, Input, Tooltip } from '@components'

import { parseJobSource } from '@utils/helpers'
import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

import { BackToIcon } from '@icons'

const JobSourcesDropdown = ({ value, error, set, onChange }) => {
    const renderJobSourcesAndInput = useMemo(() =>
        value === 'other' ? (
            <div className='flex items-center gap-1'>
                <div className='flex-1'>
                    <Input name='job_source' onChange={onChange} ph='Please enter job source' />
                </div>
                <Tooltip text='Back to List'>
                    <span
                        className='border rounded-full border-[#048c8c] p-1 cursor-pointer hover:bg-[#048c8c] hover:text-white'
                        onClick={() => set('job_source', '')}
                    >
                        {BackToIcon}
                    </span>
                </Tooltip>
            </div>
        ) : (
            <CustomSelector
                options={JOB_SOURCE_OPTIONS}
                selectorValue={parseJobSource(value)}
                handleChange={e => set('job_source', e.value)}
                placeholder='Select job source'
            />
        )
    )

    return (
        <div className='z-30'>
            <span className='text-xs font-semibold text-[#048c8c]'>Job Source*</span>
            {renderJobSourcesAndInput}
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(JobSourcesDropdown)
