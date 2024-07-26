import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { PERMISSION_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const PermissionActions = ({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {can('edit_permission') && (
                <Tooltip text='Edit Permission'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_permission') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/auth/permission/${id}/`}
                    refetch={mutate}
                    perm={PERMISSION_DELETION}
                >
                    <Tooltip text='Delete Permission'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
}

export default memo(PermissionActions)
