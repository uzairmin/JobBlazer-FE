import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { STATUS_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const StatusActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {can('edit_status') && (
                <Tooltip text='Edit status'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_status') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`/api/lead_managament/statuses/${id}/`}
                    refetch={mutate}
                    perm={STATUS_DELETION}
                >
                    <Tooltip text='Delete status'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(StatusActions)
