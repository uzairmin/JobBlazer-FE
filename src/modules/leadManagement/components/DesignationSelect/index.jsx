import { memo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchDesignations } from '@modules/leadManagement/api'

import { parseDesignations } from '@utils/helpers'

const DesignationSelect = ({ value: selected, error = null, set }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/candidate_management/designation/', fetchDesignations)

    return isLoading ? (
        <small className='ml-1 mt-3 p-3 text-xs text-gray-400'>Designation Loading...</small>
    ) : fetchError ? (
        <div>Failed to load designations</div>
    ) : (
        <div>
            <span className='text-xs font-semibold'>Designation*</span>
            <CustomSelector
                options={parseDesignations(data?.designations)}
                selectorValue={selected}
                handleChange={value => set('designation', value)}
                placeholder='Select Designation'
            />
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(DesignationSelect)
