import { memo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchAllRegions } from '@modules/settings/api'

import { SWR_REVALIDATE } from '@constants/global'

const RegionsDropdown = ({ value, set }) => {
    const { data, isLoading, error } = useSWR('/api/candidate_management/all_regions/', fetchAllRegions, SWR_REVALIDATE)

    return isLoading ? (
        <small className='ml-1 p-3 text-xs text-gray-400'>Regions Loading...</small>
    ) : error ? (
        <small className='ml-1 p-3 text-[#328d8c]'>Failed to load regions</small>
    ) : (
        <div className='pb-5 min-w-[250px]'>
            <span className='text-xs font-semibold'>Regions</span>
            <CustomSelector
                options={data}
                handleChange={obj => set(obj)}
                selectorValue={value}
                isMulti
                placeholder='Select Regions'
            />
        </div>
    )
}

export default memo(RegionsDropdown)
