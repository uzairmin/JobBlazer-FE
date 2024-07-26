import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { CustomSelector } from '@components'

const TechStackDropdown = ({ options = null }) => {
    const [techs, setTechs] = useJobPortalV2Store(state => [state?.filters?.techs, state?.setFilters?.techs])

    return (
        options && (
            <div className='w-full'>
                Tech Stack
                <hr className='mb-3 bg-slate-300 h-0.5' />
                <CustomSelector
                    options={options?.map(({ name, value }) => ({ label: name, value }))}
                    handleChange={value => setTechs(value)}
                    selectorValue={techs}
                    isMulti
                    placeholder='Select Tech Stacks'
                />
            </div>
        )
    )
}

export default memo(TechStackDropdown)
