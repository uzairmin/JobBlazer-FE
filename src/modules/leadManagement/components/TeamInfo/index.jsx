import { memo, useMemo } from 'react'

import { Badge, Tooltip } from '@components'

import { AllowLeadIcon, DenyLeadIcon } from '@icons'

const TeamInfo = ({ info, exposed = false }) => {
    const memoized = useMemo(
        () => (
            <>
                {exposed ? (
                    <td className='px-3 py-6'>
                        <span className='capitalize'>{info?.name ?? 'N/A'}</span>
                    </td>
                ) : (
                    <>
                        <td className='px-3 py-6 capitalize'>{info?.name ?? 'N/A'}</td>
                        <td className='px-3 py-6'>{info?.email ?? 'N/A'}</td>
                        <td className='px-3 py-6 italic'>{info?.phone ?? 'N/A'}</td>
                        <td className='px-6 py-6'>{info?.experience ?? 'N/A'}</td>
                        <td className='px-6 py-6'>{info?.leads ?? 'N/A'}</td>
                    </>
                )}
                <td className='px-2'>
                    <span className='flex items-center flex-wrap space-x-1.5 gap-y-1.5'>
                        {exposed && info?.team_candidates?.length > 0
                            ? info?.team_candidates?.map((team_candidate, index) => (
                                  <Badge
                                      key={index}
                                      label={team_candidate.candidate}
                                      type='success'
                                      classes='text-xs border border-green-300'
                                  />
                              ))
                            : 'N/A'}
                    </span>
                </td>
                {exposed ? null : (
                    <>
                        <td className='px-3 py-6 font-bold uppercase italic'>{info?.company?.name ?? 'N/A'}</td>
                        <td className={`px-3 py-6 ${info?.allowed_status ? 'text-green-500' : 'text-red-500'}`}>
                            <Tooltip text={info?.allowed_status ? 'Allowed' : 'Denied'} down>
                                {info?.allowed_status ? AllowLeadIcon : DenyLeadIcon}
                            </Tooltip>
                        </td>
                    </>
                )}
            </>
        ),
        [info]
    )
    return memoized
}

export default memo(TeamInfo)
