import { memo } from 'react'

import { CustomSelector } from '@components'

const LeadSearchAndFilters = ({ data, error = null, update = null, vals = null }) => {
    const changeTeam = team =>
        update({ team, members: data?.members?.filter(t => t?.team?.includes(team?.value)), selectedMembers: [] })

    return !error ? (
        <>
            {data?.members?.length > 0 && (
                <div>
                    <span className='text-xs font-semibold'>Members</span>
                    <CustomSelector
                        options={vals.members}
                        handleChange={obj => update({ selectedMembers: obj })}
                        selectorValue={vals.selectedMembers}
                        isMulti
                        placeholder='Select Members'
                    />
                </div>
            )}
            {data?.teams?.length > 0 && (
                <div>
                    <span className='text-xs font-semibold'>Team</span>
                    <CustomSelector
                        options={data?.teams}
                        handleChange={obj => changeTeam(obj)}
                        selectorValue={vals.team}
                        placeholder='Select Team'
                    />
                </div>
            )}
            {data?.stacks?.length > 0 && (
                <div>
                    <span className='text-xs font-semibold'>Tech Stacks</span>
                    <CustomSelector
                        options={data?.stacks}
                        handleChange={obj => update({ stacks: obj })}
                        selectorValue={vals.stacks}
                        isMulti
                        placeholder='Select Stacks'
                    />
                </div>
            )}
            {data?.candidates?.length > 0 && (
                <div>
                    <span className='text-xs font-semibold'>Candidates</span>
                    <CustomSelector
                        options={data?.candidates}
                        handleChange={obj => update({ candidates: obj })}
                        selectorValue={vals.candidates}
                        isMulti
                        placeholder='Select Candidates'
                    />
                </div>
            )}
        </>
    ) : (
        <small>There is an error in loading filters data</small>
    )
}

export default memo(LeadSearchAndFilters)
