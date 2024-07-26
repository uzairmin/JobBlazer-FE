import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, DeleteDialog, Tooltip } from '@components'

import { JOB_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon, Checkedbox, unCheckedbox, HistoryIcon } from '@icons'

const JobActions = memo(({ id, blocked = false, edited = false, edit, mutate, add, remove }) => {
    const [show, setShow] = useState(false)

    return (
        <span className='flex justify-center'>
            {!blocked ? (
                <Tooltip text='Mark as recruiter'>
                    <button onClick={add}>{unCheckedbox}</button>
                </Tooltip>
            ) : (
                <Tooltip text='Unmark as recruiter'>
                    <button onClick={remove}>{Checkedbox}</button>
                </Tooltip>
            )}
            <div className='flex ml-1'>
                {can('edit_job') && (
                    <Tooltip text='Edit job'>
                        <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                    </Tooltip>
                )}
                {can('delete_job') && (
                    <DeleteDialog
                        show={show}
                        setShow={setShow}
                        url={`api/job_portal/job_modification/${id}/`}
                        refetch={mutate}
                        perm={JOB_DELETION}
                    >
                        <Tooltip text='Delete job'>
                            <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                        </Tooltip>
                    </DeleteDialog>
                )}
                {can('view_job_history') && edited && (
                    <Tooltip text='View job history'>
                        <Link
                            to={`/edit-history/${id}`}
                            state={{ module: 'JobDetail', backTo: 'Job Portal', backToUrl: '/jobs-portal' }}
                            className='_icon-btn mt-2 ml-1'
                        >
                            {HistoryIcon}
                        </Link>
                    </Tooltip>
                )}
            </div>
        </span>
    )
})

export default memo(JobActions)
