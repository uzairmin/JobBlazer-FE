import { memo, useReducer, useState } from 'react'
import useSWR from 'swr'

import { Input, Button, Searchbox, Checkbox } from '@components'

import { LeadFilterByStatus, LeadFilterDropdowns } from '@modules/leadManagement/components'
import { fetchLeadFilters } from '@modules/leadManagement/api'

import { CandidateFilterIcon } from '@icons'

const LeadSearchAndFilters = ({ filtered = null, dispatch = null }) => {
    const { data, error } = useSWR('/api/lead_managament/leads_filters/', fetchLeadFilters)
    const [phasesVisibility, setPhasesVisibility] = useState(false)

    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        selectedMembers: filtered.members,
        team: filtered.team,
        stacks: filtered.stacks,
        candidates: filtered.candidates,
        members: filtered.team ? data?.members?.filter(t => t?.team?.includes(filtered.team.value)) : data?.members,
    })
    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            members: vals.selectedMembers,
            team: vals.team,
            stacks: vals.stacks,
            candidates: vals.candidates,
        })
    const clearFilters = () => {
        update({ to: '', from: '', members: [], stacks: [], team: '', candidates: [] })
        dispatch({
            filter: false,
            to: '',
            from: '',
            members: [],
            stacks: [],
            team: '',
            candidates: [],
            query: '',
            statusFilter: '',
        })
    }

    return (
        <>
            <div className='flex items-center justify-between gap-2 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <Searchbox
                        query={filtered.query}
                        setQuery={query => dispatch({ query })}
                        clear={clearFilters}
                        reset={page => dispatch({ page })}
                    />
                    <Button
                        icon={CandidateFilterIcon}
                        label='Filters'
                        onClick={() => dispatch({ filter: !filtered.filter })}
                        fit
                        fill={filtered.filter}
                    />
                    <Checkbox
                        name='Phases'
                        label='Phases'
                        checked={phasesVisibility}
                        onChange={e => {
                            console.log(e.checked)
                            setPhasesVisibility(e.target.checked)
                        }}
                    />
                </div>
            </div>
            {!phasesVisibility && <LeadFilterByStatus active={filtered.statusFilter} dispatch={dispatch} />}
            {filtered.filter ? (
                <div className='grid grid-cols-4 auto-cols-max items-end gap-x-4 gap-y-2 p-4 text-[#338d8c] bg-slate-50 border border-cyan-600 rounded-xl'>
                    <div>
                        <span className='text-xs font-semibold'>From Date</span>
                        <Input
                            type='date'
                            onChange={({ target: { value } }) =>
                                update({ from: value, to: vals.to && value > vals.to ? value : vals.to })
                            }
                            value={vals.from}
                        />
                    </div>
                    <div>
                        <span className='text-xs font-semibold'>To Date</span>
                        <Input
                            type='date'
                            onChange={e => update({ to: e.target.value })}
                            value={vals.to}
                            min={vals.from}
                        />
                    </div>
                    <LeadFilterDropdowns vals={vals} update={update} data={data} error={error} />
                    <Button label='Apply' classes='!px-8 !py-2' fit onClick={applyFilters} />
                </div>
            ) : null}
        </>
    )
}

export default memo(LeadSearchAndFilters)
