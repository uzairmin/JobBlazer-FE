import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { VERTICAL_LINK_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const LinkActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-2 flex'>
            <Tooltip text='Edit link'>
                <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
            </Tooltip>
            <DeleteDialog
                show={show}
                setShow={setShow}
                url={`api/profile/links/${id}/`}
                refetch={mutate}
                perm={VERTICAL_LINK_DELETION}
            >
                <Tooltip text='Delete link'>
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </Tooltip>
            </DeleteDialog>
        </div>
    )
})

export default memo(LinkActions)
