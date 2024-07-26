import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, EmptyTable, Tooltip } from '@components'

import { fetchTeamMembers } from '@modules/userManagement/api'
import { PseudosMemberForm, MemberVerticals, MemberRegions, TeamVerticals } from '@modules/userManagement/components'

import { can } from '@utils/helpers'
import { teamMemberHeads } from '@constants/userManagement'

import { CreateIcon } from '@icons'

const Team = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    const [role, setRole] = useState(null)
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(
        `api/profile/user_vertical_assignment/?team_id=${id}`,
        fetchTeamMembers
    )

    const handleClick = (row, userRole = null) => {
        setUser(row)
        setRole(userRole)
        setShow(!show)
    }

    if (isLoading) return <Loading />

    const renderTeams = error ? (
        <EmptyTable cols={6} msg='Failed to load team members..' />
    ) : data?.team?.members?.length > 0 ? (
        data?.team?.members?.map((row, idx) => (
            <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row?.id}>
                <td className='px-3 py-6'>{idx + 1}</td>
                <td className='px-3 py-6 capitalize'>{row?.username ?? '-'}</td>
                <td className='px-3'>
                    <span className=' flex flex-col justify-center'>
                        <span className='capitalize'>{row?.reporting_to?.username}</span>
                        <span className='font-mono'>{row?.email}</span>
                    </span>
                </td>
                <td className='px-3 py-4'>
                    <MemberRegions regions={row?.regions} />
                </td>
                <td className='px-3 py-4'>
                    <MemberVerticals member={row} edit={handleClick} />
                </td>
                <td className='px-3 py-4'>
                    {can('edit_member_team') && row?.regions?.length > 0 && row?.allow_assignment && (
                        <Tooltip text='Assign verticals'>
                            <span onClick={() => handleClick(row)}>{CreateIcon}</span>
                        </Tooltip>
                    )}
                </td>
            </tr>
        ))
    ) : (
        <EmptyTable cols={6} msg='No members found yet!' />
    )

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <TeamVerticals verticals={data?.team?.verticals} />
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {teamMemberHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderTeams}</tbody>
            </table>
            {show && can('edit_member_team') && (
                <PseudosMemberForm
                    show={show}
                    setShow={setShow}
                    mutate={mutate}
                    user={user}
                    vert={data?.team?.verticals?.filter(row => row?.regions?.length > 0)}
                    teamId={id}
                    role={role}
                />
            )}
        </div>
    )
}

export default memo(Team)
