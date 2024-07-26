import { memo, useReducer, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { Button, CustomSelector } from '@components'
import { downloadFilteredJobs } from '@modules/teamAppliedJobs/api'
import { FilterDates, MyDownloads } from '@modules/teamAppliedJobs/components'
import { parseMembers, parseVals, parseLinks } from '@utils/helpers'
import { JOB_TYPES_OPTIONS } from '@constants/scrapper'
import { TEAM_APPLIED_JOBS_INITIAL_VALS as initFilters } from '@constants/teamAppliedJobs'
import { DownloadIcon, LogsIcon } from '@icons'

const Filters = ({ filtered = null, dispatch = null, data = null, dropdowns }) => {
    const [flag, setFlag] = useState(false)
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        start: filtered.start,
        end: filtered.end,
        stacks: filtered.stacks,
        sources: filtered.sources,
        types: filtered.types,
        bd: filtered.bd,
    })

    const applyFilters = () => {
        dispatch({
            start: vals.start,
            end: vals.end,
            stacks: vals.stacks,
            sources: vals.sources,
            types: vals.types,
            bd: vals.bd,
        })
    }

    const { trigger, isLoading } = useSWRMutation(
        `/api/job_portal/team_applied_job_details/?download=true&end_date=${vals.end}&job_type=${parseLinks(
            vals.types
        ).join()}&applied_by=${vals?.bd?.value ? vals?.bd?.value : ''}&job_source=${parseLinks(
            vals.sources
        ).join()}&start_date=${vals.start}&tech_stacks=${parseLinks(vals.stacks).join()}`,
        downloadFilteredJobs
    )

    const clearFilters = () => {
        dispatch({ ...initFilters })
        update({ start: '', end: '', stacks: [], sources: [], types: [], download: false, bd: initFilters.bd })
        setFlag(false)
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-1 mx-2 mb-3 p-4 shadow-md text-[#338d8c] rounded-xl bg-slate-100 border'>
            <div>
                <span className='text-xs font-semibold'>Team Member</span>
                <CustomSelector
                    options={parseMembers(data?.team_members, null)}
                    handleChange={obj => update({ bd: obj })}
                    selectorValue={vals.bd}
                    placeholder='Select Team Member'
                />
            </div>
            <FilterDates vals={vals} update={update} />
            <div>
                <span className='text-xs font-semibold'>Job Sources</span>
                <CustomSelector
                    options={parseVals(dropdowns?.data?.job_sources)}
                    handleChange={obj => update({ sources: obj })}
                    selectorValue={vals.sources}
                    isMulti
                    placeholder='Select Sources'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Job Types</span>
                <CustomSelector
                    options={JOB_TYPES_OPTIONS}
                    handleChange={obj => update({ types: obj })}
                    selectorValue={vals.types}
                    isMulti
                    placeholder='Select Types'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Tech Stacks</span>
                <CustomSelector
                    options={parseVals(dropdowns?.data?.tech_keywords)}
                    handleChange={obj => update({ stacks: obj })}
                    selectorValue={vals.stacks}
                    isMulti
                    placeholder='Select Stacks'
                />
            </div>
            <div className='flex items-center gap-2 mt-6'>
                <Button label='Apply' classes='!px-8 !py-2' fit onClick={applyFilters} />
                {(filtered.start ||
                    filtered.end ||
                    flag ||
                    filtered.bd?.value !== 'all' ||
                    filtered.stacks.length > 0 ||
                    filtered.sources.length > 0 ||
                    filtered.types.length > 0) && <Button fit onClick={clearFilters} label='Clear' />}
            </div>
            <div className='flex gap-2 items-center mt-6'>
                <Button
                    icon={DownloadIcon}
                    label={isLoading ? 'Downloading....' : 'Download'}
                    classes='!px-8 !py-2'
                    onClick={trigger}
                />
                <Button icon={LogsIcon} label='logs' classes='' onClick={() => setFlag(!flag)} />
            </div>
            {flag && <MyDownloads show={flag} setShow={setFlag} />}
        </div>
    )
}

export default memo(Filters)
