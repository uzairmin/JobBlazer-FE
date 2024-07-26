import { memo, useMemo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchTechStacks } from '@modules/jobsUploader/api'

import { parseTechKeywords, parseSelectedTechKeyword } from '@utils/helpers'

const TechStacksDropdown = ({ value, error, set }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/job_portal/tech_keywords/', fetchTechStacks)

    const renderTechStacks = useMemo(() =>
        isLoading ? (
            <div>Loading tech stacks....</div>
        ) : fetchError ? (
            <div className='text-red-500 text-xs'>Failed to fetch tech stacks</div>
        ) : (
            <CustomSelector
                options={parseTechKeywords(data.techStacks)}
                selectorValue={parseSelectedTechKeyword(value, parseTechKeywords(data.techStacks))}
                handleChange={e => set('tech_keywords', e.value)}
                placeholder='Select tech stacks'
            />
        )
    )

    return (
        <div className='z-20'>
            <span className='text-xs font-semibold text-[#048c8c]'>Tech Keywords*</span>
            {renderTechStacks}
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(TechStacksDropdown)
