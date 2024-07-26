import { memo } from 'react'

import { Input } from '@components'

import { EDIT_JOB_INPUTS } from '@constants/jobPortal'

const JobEditInputs = ({ values, errors, handleChange }) =>
    EDIT_JOB_INPUTS.map(row => (
        <div key={row.name}>
            <span className='text-xs font-semibold text-[#048c8c]'>
                {row.label}
                {row.required ? '*' : ''}
            </span>
            <Input name={row.name} onChange={handleChange} value={values[row.name]} type={row.type} ph={row.ph} />
            {errors[row.name] && <small className='__error'>{errors[row.name]}</small>}
        </div>
    ))

export default memo(JobEditInputs)
