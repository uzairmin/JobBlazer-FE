import { memo, useState } from 'react'

import { useMutate } from '@/hooks'
import { Button, DeleteDialog, Tooltip } from '@components'

import { changeCandidateStatus } from '@modules/leadManagement/api'
import { CandidateActionsModel } from '@modules/leadManagement/components'

import { can, decodeJwt } from '@utils/helpers'
import { CANDIDATE_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon, SeePassIcon, AllowLogin, RestrictLogin } from '@icons'

const CandidateActions = ({ row, edit, mutate }) => {
    const user = decodeJwt()
    const [show, setShow] = useState(false)
    const [statusUpdate, setStatusUpdate] = useState(false)
    const [loginStatusUpdate, setLoginStatusUpdate] = useState(false)

    const { handleSubmit, trigger } = useMutate(
        '/api/candidate_management/candidate/',
        changeCandidateStatus,
        statusUpdate ? { status: !row?.allowed_status } : { login_status: !row?.allowed_login },
        null,
        async formValues => trigger({ ...formValues, candidate: row?.id }),
        null,
        () => mutate()
    )
    const flag = row?.company?.id === user?.company
    return (
        <div className='flex items-center'>
            {flag && (
                <>
                    {can('delete_candidate') && (
                        <DeleteDialog
                            show={show}
                            setShow={setShow}
                            url={`api/candidate_management/candidate/${row?.id}/`}
                            refetch={mutate}
                            perm={CANDIDATE_DELETION}
                        >
                            <Tooltip text='Delete candidate'>
                                <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                            </Tooltip>
                        </DeleteDialog>
                    )}
                    {can('edit_candidate') && (
                        <Tooltip text='Edit candidate'>
                            <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit(row)} />
                        </Tooltip>
                    )}
                    {can('edit_candidate') && (
                        <Tooltip text={`${row?.allowed_login ? 'Allow' : 'Restrict'} Login`}>
                            <Button
                                classes='_icon-btn'
                                icon={row?.allowed_login ? RestrictLogin : AllowLogin}
                                onClick={() => setLoginStatusUpdate(true)}
                            />
                        </Tooltip>
                    )}
                </>
            )}
            {can('edit_candidate') && (
                <Tooltip text={`${row?.allowed_status ? 'Deny' : 'Allow'} Leads`}>
                    <Button classes='_icon-btn' icon={SeePassIcon} onClick={() => setStatusUpdate(true)} />
                </Tooltip>
            )}
            <CandidateActionsModel
                show={statusUpdate || loginStatusUpdate}
                setShow={statusUpdate ? setStatusUpdate : setLoginStatusUpdate}
                handleSubmit={handleSubmit}
                message={
                    statusUpdate ? (
                        <>
                            Are you sure to {row?.allowed_status ? 'deny' : 'allow'} this candidate
                            <span className='font-bold mx-2'>{row?.name}</span>to take leads?
                        </>
                    ) : (
                        <>
                            Are you sure to {row?.allowed_login ? 'allow' : 'restrict'} login for <b>{row?.name}</b>
                        </>
                    )
                }
            />
        </div>
    )
}

export default memo(CandidateActions)
