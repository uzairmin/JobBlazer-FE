import { memo, useMemo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchTechStacks } from '@modules/jobsUploader/api'

import { parseTechKeywords } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

const TechsDropdown = ({ selected, error, set }) => {
    const {
        data,
        isLoading,
        error: fetchError,
    } = useSWR('/api/job_portal/tech_keywords/', fetchTechStacks, SWR_REVALIDATE)

    const renderTechStacks = useMemo(() =>
        isLoading ? (
            <div>Loading tech stacks....</div>
        ) : fetchError ? (
            <div className='text-red-500 text-xs'>Failed to fetch tech stacks</div>
        ) : (
            <CustomSelector
                options={parseTechKeywords(data.techStacks)}
                selectorValue={selected}
                handleChange={obj => set('tech_keywords', obj)}
                placeholder='Select tech stacks'
                isMulti
            />
        )
    )

    return (
        <div className='z-20 col-span-2'>
            <span className='text-xs font-semibold text-[#048c8c]'>Tech Keywords*</span>
            {renderTechStacks}
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(TechsDropdown)
