import { memo, useReducer } from 'react'
import { Button, CustomSelector } from '@components'
import { FilterDates } from '@modules/leadManagement/components'
import { JOB_SOURCE_OPTIONS_UNDERSCORE, JOB_SOURCE_OPTIONS, JOB_TYPES_OPTIONS } from '@constants/scrapper'

const CandidateFilters = ({ filtered = null, dispatch = null }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        skills: filtered.skills,
        regions: filtered.regions,
        designation: filtered.designation,
        companies: filtered.companies,
    })

    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            skills: vals.skills,
            regions: vals.regions,
            companies: vals.companies,
            designation: vals.designation,
        })

    const clearFilters = () => {
        dispatch({
            from: '',
            to: '',
            skills: [],
            regions: [],
            companies: [],
            designation: '',
            filter: false,
        })
        update({
            from: '',
            to: '',
            skills: [],
            regions: [],
            companies: [],
            designation: '',
        })
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4 p-4 shadow-md text-[#338d8c] rounded-xl bg-slate-100 border mt-4 items-end'>
            <FilterDates vals={vals} update={update} />

            <div>
                <span className='text-xs font-semibold'>Skills</span>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS}
                    handleChange={obj => update({ skills: obj })}
                    selectorValue={vals.skills}
                    isMulti
                    placeholder='Select Skills'
                />
            </div>

            <div>
                <span className='text-xs font-semibold'>Designation</span>
                <CustomSelector
                    options={JOB_TYPES_OPTIONS}
                    handleChange={obj => update({ designation: obj })}
                    selectorValue={vals.designation}
                    placeholder='Select Designation'
                />
            </div>

            <div>
                <span className='text-xs font-semibold'>Regions</span>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS_UNDERSCORE}
                    handleChange={obj => update({ regions: obj })}
                    selectorValue={vals.regions}
                    isMulti
                    placeholder='Select Regions'
                />
            </div>

            <div>
                <span className='text-xs font-semibold'>Companies</span>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS_UNDERSCORE}
                    handleChange={obj => update({ companies: obj })}
                    selectorValue={vals.companies}
                    isMulti
                    placeholder='Select Companies'
                />
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-2'>
                <Button label='Apply' classes='!w-full sm:w-auto !px-8 !py-2' fit onClick={applyFilters} />
                {(filtered.from ||
                    filtered.to ||
                    filtered.designation ||
                    filtered.skills.length > 0 ||
                    filtered.regions.length > 0 ||
                    filtered.companies.length > 0) && (
                    <Button fit onClick={clearFilters} label='Clear' classes='!w-full sm:w-auto mt-2 sm:mt-0' />
                )}
            </div>
        </div>
    )
}

export default memo(CandidateFilters)
