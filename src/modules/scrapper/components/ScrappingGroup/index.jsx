import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, EmptyTable, Loading, Tooltip, Badge } from '@components'

import { GroupSettingActions, GroupForm } from '@modules/scrapper/components'
import { fetchGroupDetails } from '@modules/scrapper/api'

import { can, convertFrom24To12Format, formatStringInPascal } from '@utils/helpers'
import { GROUP_SETTING_HEADS } from '@constants/scrapper'

import { CreateIcon } from '@icons'

const GroupSetting = () => {
    const [setting, setSetting] = useState()
    const [show, setShow] = useState(false)

    const { data, isLoading, error, mutate } = useSWR('/api/job_scraper/group_scheduler/', fetchGroupDetails)

    const handleClick = (values = null) => {
        setSetting(values)
        setShow(true)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full mb-14'>
            <div className='flex items-center space-x-4 pb-6'>
                {can('create_cronjob_setting') && (
                    <Button label='Create New Group' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {GROUP_SETTING_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.groups?.length > 0 && !error ? (
                        data?.groups?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{formatStringInPascal(row.name)}</td>
                                <td className='px-3 py-6'>
                                    {row?.scheduler_settings?.time_based ? 'Time Based' : 'Interval Based'}
                                </td>
                                <td className='px-3 py-6'>
                                    {row?.scheduler_settings?.time_based
                                        ? convertFrom24To12Format(row?.scheduler_settings?.time)
                                        : row?.scheduler_settings?.interval && row?.scheduler_settings?.interval_type
                                        ? `After every ${row?.scheduler_settings?.interval} ${row?.scheduler_settings?.interval_type}`
                                        : 'not-specified'}
                                </td>
                                <td className='px-3 py-6'>
                                    {row?.scheduler_settings?.week_days?.split(',')?.length > 0 &&
                                        row?.scheduler_settings?.week_days?.split(',')?.map((q, index) => (
                                            <span className='font-mono m-1 inline-block' key={index}>
                                                <a href={q} target='_blank' rel='noreferrer'>
                                                    <Tooltip text={q}>
                                                        <Badge label={`${q} `} type='success' />
                                                    </Tooltip>
                                                </a>
                                            </span>
                                        ))}
                                </td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_cronjob_setting', 'delete_cronjob_setting']) && (
                                        <GroupSettingActions
                                            id={row?.id}
                                            edit={() => handleClick(row)}
                                            mutate={mutate}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No groups found yet!' />
                    )}
                </tbody>
            </table>
            {can(['edit_cronjob_setting', 'create_cronjob_setting']) && show && (
                <GroupForm show={show} setShow={setShow} mutate={mutate} setting={setting} />
            )}
        </div>
    )
}

export default memo(GroupSetting)
