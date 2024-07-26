import { memo } from 'react'

import { SelectBox } from '@components'

import { parseUsers, parseSelectedUser } from '@utils/helpers'

const ReportingToDropdown = ({ value: selected, error = null, setFieldValue, options = null, wait = false }) =>
    wait ? (
        <small className='ml-1 p-3 text-xs text-gray-400'>Users Loading...</small>
    ) : options?.length > 0 ? (
        <>
            <span className='text-xs font-semibold'>Reporting To*</span>
            <SelectBox
                options={parseUsers(options)}
                selected={parseSelectedUser(selected, options)}
                handleChange={({ value }) => setFieldValue('reporting_to', value)}
                classes='text-gray-500 text-sm'
            />
            {error && <small className='ml-1 text-xs text-red-600'>{error}</small>}
        </>
    ) : (
        <small>There is no user found for such role. Change role first</small>
    )

export default memo(ReportingToDropdown)
