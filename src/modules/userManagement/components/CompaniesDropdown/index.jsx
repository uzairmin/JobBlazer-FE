import { memo } from 'react'
import useSWR from 'swr'

import { SelectBox } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'

import { isSuper, parseComapnies, parseSelectedCompany } from '@utils/helpers'

const CompaniesDropdown = ({ value: selected, error = null, setFieldValue, onChange = null }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/auth/company/', isSuper() && fetchCompanies)

    return (
        isSuper() &&
        (isLoading ? (
            <small className='ml-1 p-3 text-xs text-gray-400'>Companies Loading...</small>
        ) : fetchError ? (
            <div>Failed to load companies</div>
        ) : (
            <>
                <span className='text-xs font-semibold'>Company*</span>
                <SelectBox
                    options={parseComapnies(data?.companies)}
                    selected={parseSelectedCompany(selected, data?.companies)}
                    handleChange={onChange || (({ value }) => setFieldValue('company', value))}
                    classes='text-gray-500 text-sm'
                />
                {error && <small className='ml-1 text-xs text-red-600'>{error}</small>}
            </>
        ))
    )
}

export default memo(CompaniesDropdown)
