import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, DeleteDialog, Tooltip, Modal } from '@components'

import { toggleMarkAsExpired } from '@modules/jobsUploader/api'

import { can } from '@utils/helpers'
import { JOB_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon, Checkedbox, unCheckedbox, HistoryIcon } from '@icons'

const ManualJobActions = memo(({ id, expired = false, edit = null, edited = false, mutate, editAndDel = true }) => {
    const [show, setShow] = useState(false)
    const [confirm, setConfirm] = useState(false)

    return (
        <span className='flex justify-center'>
            {can('mark_as_expired') &&
                (!expired ? (
                    <Tooltip text='Mark as expired'>
                        <button onClick={() => setConfirm(true)}>{unCheckedbox}</button>
                    </Tooltip>
                ) : (
                    <Tooltip text='Unmark as active'>
                        <button onClick={() => setConfirm(true)}>{Checkedbox}</button>
                    </Tooltip>
                ))}
            <div className='flex ml-1'>
                {editAndDel && (
                    <>
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
                    </>
                )}
                {can('view_job_history') && edited && (
                    <Tooltip text='View job history'>
                        <Link
                            to={`/edit-history/${id}`}
                            state={{ module: 'JobDetail', backTo: 'Manual Jobs', backToUrl: '/jobs-uploader' }}
                            className='_icon-btn mt-2 ml-1'
                        >
                            {HistoryIcon}
                        </Link>
                    </Tooltip>
                )}
            </div>
            <Modal
                classes='!w-1/3'
                show={confirm}
                setShow={setConfirm}
                content={
                    <div className='w-full'>
                        <h3 className='mt-1'>
                            Are you sure to
                            <span className='font-bold mx-2'>{!expired ? 'Mark as expired' : 'Unmark as active'}</span>
                            this job?
                        </h3>
                        <div className='flex items-center mt-3 gap-3 float-right'>
                            <Button
                                classes='bg-red-500 border-red-500 hover:bg-red-600'
                                label='Confirm'
                                fill
                                onClick={() => {
                                    toggleMarkAsExpired(id).then(() => {
                                        setConfirm(false)
                                        mutate()
                                    })
                                }}
                            />
                            <Button label='Cancel' onClick={() => setConfirm(false)} />
                        </div>
                    </div>
                }
            />
        </span>
    )
})

export default memo(ManualJobActions)
