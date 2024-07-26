import { memo, useMemo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'
import { fetchUserRoles } from '@modules/userManagement/api'

const UserRolesDropdown = ({ value = null, set = null, options = {} }) => {
    const { data, isLoading, error } = useSWR(
        `/api/auth/roles/?user_id=${options?.userId}&team_id=${options?.teamId}`,
        fetchUserRoles
    )

    const renderUserRoles = useMemo(() =>
        isLoading ? (
            <div>Loading roles....</div>
        ) : error ? (
            <div className='text-red-500 text-xs'>Failed to fetch roles</div>
        ) : (
            <CustomSelector
                options={data?.roles}
                selectorValue={value}
                handleChange={e => set('role_id', e)}
                placeholder='Select Role'
            />
        )
    )
    return (
        <div className='z-20'>
            <span className='text-xs font-semibold text-[#048c8c]'>Roles*</span>
            {renderUserRoles}
            {options?.error && <small className='__error'>{options?.error}</small>}
        </div>
    )
}

export default memo(UserRolesDropdown)
