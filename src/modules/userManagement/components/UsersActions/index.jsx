import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const UsersActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex items-center'>
            {can('delete_user') && (
                <DeleteDialog show={show} setShow={setShow} url={`api/auth/user/${id}/`} refetch={mutate}>
                    <Tooltip text='Delete user'>
                        <Button classes='bg-transparent border-0 !p-0' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
            {can('edit_user') && (
                <Tooltip text='Edit user'>
                    <Button classes='bg-transparent border-0 !p-0' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
        </div>
    )
})

export default memo(UsersActions)
