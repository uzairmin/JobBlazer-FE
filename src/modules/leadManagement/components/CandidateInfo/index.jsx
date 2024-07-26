import { memo, useMemo } from 'react'

import { Badge, Tooltip } from '@components'

import { AllowLeadIcon, DenyLeadIcon } from '@icons'

const CandidateInfo = ({ info, exposed = false }) => {
    const memoized = useMemo(
        () => (
            <>
                {exposed ? (
                    <td className='px-3 py-6'>
                        <span className='capitalize'>{info?.candidate?.name ?? 'N/A'}</span>
                        {info?.candidate?.email && (
                            <span className='text-xs ml-1 italic'>{`(${info?.candidate?.email})`}</span>
                        )}
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
                        {exposed
                            ? info?.candidate?.skills?.length > 0
                                ? info?.candidate?.skills?.map((skill, index) => (
                                      <Badge
                                          key={index}
                                          label={skill}
                                          type='success'
                                          classes='text-xs border border-green-300'
                                      />
                                  ))
                                : 'N/A'
                            : info?.skills?.length > 0
                            ? info?.skills?.map((skill, index) => (
                                  <Badge
                                      key={index}
                                      label={skill?.name}
                                      type='success'
                                      classes='text-xs border border-green-300'
                                  />
                              ))
                            : 'N/A'}
                    </span>
                </td>
                <td className='px-3 py-1'>
                    {exposed ? (
                        <Badge label={info?.candidate?.designation || 'N/A'} />
                    ) : info?.designation?.name ? (
                        <Badge label={info?.designation?.name} />
                    ) : (
                        'N/A'
                    )}
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

export default memo(CandidateInfo)
