import { memo, useMemo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchTechStacks } from '@modules/jobsUploader/api'

import { isset, parseTechKeywords } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

const StacksDropdown = ({ value, update }) => {
    const { data, isLoading, error } = useSWR('/api/job_portal/tech_keywords/', fetchTechStacks, SWR_REVALIDATE)

    const renderTechStacks = useMemo(() =>
        isLoading ? (
            <div className='text-[#1E6570] p-3'>Loading tech stacks....</div>
        ) : (
            isset(data?.techStacks) && (
                <CustomSelector
                    options={parseTechKeywords(data?.techStacks)}
                    selectorValue={value}
                    handleChange={obj => update({ excluded: obj })}
                    placeholder='Select stacks to exlcude...'
                    isMulti
                />
            )
        )
    )
    return !error && <div>{renderTechStacks}</div>
}

export default memo(StacksDropdown)
