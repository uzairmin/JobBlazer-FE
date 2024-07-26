import { memo } from 'react'
import useSWRImmutable from 'swr/immutable'

import { CustomSelector, Loading } from '@components'

import { JobInfo, ApplyHistory } from '@modules/jobsFilter/components'
import { fetchUserVerticals } from '@modules/jobsFilter/api'

import {
    decodeJwt,
    parseVerticals,
    parseSelectedVertical,
    parseTeams,
    parseSelectedTeam,
    getTeamVerticals,
} from '@utils/helpers'

const VerticalSelect = ({ jobId, vId, teamId, setVals }) => {
    const { user_id } = decodeJwt()

    const { data, isLoading } = useSWRImmutable(
        `/api/profile/user_vertical/?user_id=${user_id}&job_id=${jobId}`,
        fetchUserVerticals
    )

    if (isLoading) return <Loading />
    return data ? (
        <div>
            {data?.job && <JobInfo job={data?.job} />}
            {data?.history?.length > 0 && <ApplyHistory history={data?.history} />}
            <p className='text-gray-600 pb-1'>Teams</p>
            <CustomSelector
                options={parseTeams(data?.assigned)}
                selectorValue={parseSelectedTeam(teamId, data?.assigned)}
                handleChange={({ value }) => setVals({ teamId: value, verticalId: null })}
                placeholder='Select Team'
            />
            {teamId && (
                <>
                    <p className='text-gray-600 pt-2 pb-1'>Verticals</p>
                    <CustomSelector
                        options={parseVerticals(getTeamVerticals(teamId, data?.assigned), true)}
                        selectorValue={parseSelectedVertical(vId, getTeamVerticals(teamId, data?.assigned))}
                        handleChange={({ value }) => setVals({ verticalId: value })}
                        placeholder='Select Vertical'
                    />
                </>
            )}
        </div>
    ) : (
        <span className='mx-auto'>There is error in fetching job or teams or verticals</span>
    )
}

export default memo(VerticalSelect)
