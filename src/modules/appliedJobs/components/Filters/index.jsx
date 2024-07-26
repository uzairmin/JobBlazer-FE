import { memo, useReducer, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { Button, CustomSelector } from '@components'
import { downloadFilteredJobs } from '@modules/teamAppliedJobs/api'
import { FilterDates } from '@modules/appliedJobs/components'
import { MyDownloads } from '@modules/teamAppliedJobs/components'
import { JOB_TYPES_OPTIONS } from '@constants/scrapper'
import { parseLinks, parseVals } from '@utils/helpers'
import { DownloadIcon, LogsIcon } from '@icons'

const Filters = ({ filtered = null, dispatch = null, agent = false, dropdowns }) => {
    const [flag, setFlag] = useState(false)
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        stacks: filtered.stacks,
        sources: filtered.sources,
        types: filtered.types,
        verticals: filtered.verticals,
        agents: filtered.agents,
    })
    const applyFilters = () => {
        dispatch({
            from: vals.from,
            to: vals.to,
            stacks: vals.stacks,
            sources: vals.sources,
            types: vals.types,
            verticals: vals.verticals,
            agents: vals.agents,
        })
    }
    const { trigger, isLoading } = useSWRMutation(
        `api/job_portal/applied_jobs/?download=true&end_date=${vals.to}&job_type=${parseLinks(
            vals.types
        ).join()}&job_source=${parseLinks(vals.sources).join()}&start_date=${vals.from}&tech_stacks=${parseLinks(
            vals.stacks
        ).join()}`,
        downloadFilteredJobs
    )
    const clearFilters = () => {
        dispatch({
            from: '',
            to: '',
            stacks: [],
            sources: [],
            types: [],
            verticals: [],
            agents: [],
            filter: false,
        })
        update({
            from: '',
            to: '',
            stacks: [],
            sources: [],
            types: [],
            verticals: [],
            agents: [],
        })
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-1 mx-2 mb-3 p-4 shadow-md text-[#338d8c] rounded-xl bg-slate-100 border'>
            <FilterDates vals={vals} update={update} />
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
            <div className='flex items-center gap-2 mt-6'>
                <Button label='Apply' classes='!px-8 !py-2' fit onClick={applyFilters} />
                {(filtered.from ||
                    filtered.to ||
                    filtered.stacks.length > 0 ||
                    filtered.sources.length > 0 ||
                    filtered.types.length > 0 ||
                    (agent && filtered.agent)) && <Button fit onClick={clearFilters} label='Clear' />}
            </div>
            <div className='flex gap-2 items-center mt-6'>
                <Button
                    icon={DownloadIcon}
                    label={isLoading ? 'Downloading....' : 'Download'}
                    classes='!px-8 !py-2'
                    onClick={trigger}
                />
                <Button icon={LogsIcon} label='logs' classes='!px-8 !py-2' onClick={() => setFlag(!flag)} />
            </div>
            {flag && <MyDownloads show={flag} setShow={setFlag} />}
        </div>
    )
}

export default memo(Filters)
