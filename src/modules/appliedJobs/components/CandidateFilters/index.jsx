import { memo, useMemo, useReducer } from 'react'

import { CustomSelector, Button } from '@components'

const CandidateFilters = ({ options, selected, dispatch = null }) => {
    const { skills, designations, regions } = selected

    const [filters, setFilters] = useReducer((prev, next) => ({ ...prev, ...next }), {
        skills: options?.skills.filter(({ value }) => skills?.split(',').includes(value.toString())),
        designations: options?.designations.filter(({ value }) => designations?.split(',').includes(value.toString())),
        regions: options?.regions.filter(({ value }) => regions?.split(',').includes(value.toString())),
    })

    const applyFilters = () =>
        dispatch({
            skills: filters.skills.map(s => s.value).join(','),
            designations: filters.designations.map(s => s.value).join(','),
            regions: filters.regions.map(s => s.value).join(','),
        })

    useMemo(() => {
        if (skills.length < 1 && designations.length < 1 && regions.length < 1)
            setFilters({ skills: [], designations: [], regions: [] })
    }, [skills, designations, regions])

    return (
        <div className='grid grid-cols-4 items-center gap-2 bg-slate-100 p-2'>
            <CustomSelector
                name='skills'
                options={options?.skills}
                handleChange={obj => setFilters({ skills: obj })}
                selectorValue={filters.skills}
                isMulti
                placeholder='Select Skills'
            />
            <CustomSelector
                name='designations'
                options={options?.designations}
                handleChange={obj => setFilters({ designations: obj })}
                selectorValue={filters.designations}
                isMulti
                placeholder='Select Designations'
            />
            <CustomSelector
                name='regions'
                options={options?.regions}
                handleChange={obj => setFilters({ regions: obj })}
                selectorValue={filters.regions}
                isMulti
                placeholder='Select Regions'
            />
            <Button label='Get' classes='!px-4' fit onClick={applyFilters} />
        </div>
    )
}

export default memo(CandidateFilters)
