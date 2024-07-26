import { memo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchGroupDetails } from '@modules/scrapper/api'

import { parseGroups, parseSelectedGroup } from '@utils/helpers'

const GroupsDropdown = ({ value: selected, error = null, setFieldValue, onChange = null }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/job_scraper/group_scheduler/', fetchGroupDetails)

    return isLoading ? (
        <small className='ml-1 p-3 text-xs text-gray-400'>Groups Loading...</small>
    ) : fetchError ? (
        <div>Failed to load groups</div>
    ) : (
        <>
            <CustomSelector
                options={parseGroups(data?.groups)}
                selectorValue={parseSelectedGroup(selected, data?.groups)}
                handleChange={onChange || (({ value }) => setFieldValue('group_scraper', value))}
                classes='text-gray-500 text-sm'
            />
            {error && <small className='ml-1 text-xs text-red-600'>{error}</small>}
        </>
    )
}

export default memo(GroupsDropdown)
