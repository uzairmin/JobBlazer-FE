import { memo, useState } from 'react'

import { Badge, DeleteDialog } from '@components'

import { GroupLinkEditForm } from '@modules/scrapper/components'

import { can } from '@utils/helpers'
import { JOB_SOURCES } from '@constants/scrapper'

import { UptoIcon, EditIcon, TrashIcon } from '@icons'

const GroupLinkRow = ({ row = null, actions = false, status = false, mutate }) => {
    const [switchForm, setSwitchForm] = useState(false)
    const [show, setShow] = useState(false)

    return (
        <div className='mt-2 flex justify-between items-center p-3 bg-slate-100 border border-[#338d8c] border-opacity-40 rounded-lg hover:bg-cyan-50'>
            {switchForm ? (
                <GroupLinkEditForm link={row} switchForm={setSwitchForm} mutate={mutate} />
            ) : (
                <>
                    <span className='capitalize'>{JOB_SOURCES[row?.job_source] ?? row?.job_source}</span>
                    <span>{row?.job_type ?? 'N/A'}</span>
                    {status && <span>{row?.status ? <Badge label={row?.status} /> : '--'}</span>}
                    <span className='flex items-center gap-2'>
                        <a
                            href={row?.link ?? '#'}
                            target='_blank'
                            rel='noreferrer'
                            className='flex w-fit items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'
                        >
                            <span className='animate-ping'>{UptoIcon}</span>
                            <span>Visit link</span>
                        </a>
                        {actions && can(['edit_job_source_link', 'delete_job_source_link']) && (
                            <>
                                {can('edit_job_source_link') && (
                                    <span
                                        className='flex w-fit justify-center items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2 cursor-pointer'
                                        onClick={() => setSwitchForm(true)}
                                    >
                                        <span>{EditIcon}</span>
                                        <span>Edit</span>
                                    </span>
                                )}
                                {can('delete_job_source_link') && (
                                    <DeleteDialog
                                        show={show}
                                        setShow={setShow}
                                        url={`api/job_scraper/group_scheduler_link/${row?.id}/`}
                                        refetch={mutate}
                                    >
                                        <span
                                            className='flex w-fit justify-center items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2 cursor-pointer'
                                            onClick={() => setShow(true)}
                                        >
                                            <span>{TrashIcon}</span>
                                            <span>Delete</span>
                                        </span>
                                    </DeleteDialog>
                                )}
                            </>
                        )}
                    </span>
                </>
            )}
        </div>
    )
}

export default memo(GroupLinkRow)
