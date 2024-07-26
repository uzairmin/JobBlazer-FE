import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { CreateVertical } from '@modules/pseudos/components'

import { can } from '@utils/helpers'
import { PSEUDO_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon, CreateIcon } from '@icons'

const PseudoActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)
    const [createVertical, setCreateVertical] = useState(false)

    return (
        <div className='flex items-center'>
            {can('create_vertical') && (
                <Tooltip text='Add vertical'>
                    <Button classes='_icon-btn' icon={CreateIcon} onClick={() => setCreateVertical(true)} />
                </Tooltip>
            )}
            {can('edit_pseudo') && (
                <Tooltip text='Edit pseudo'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_pseudo') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/profile/pseudo/${id}/`}
                    refetch={mutate}
                    perm={PSEUDO_DELETION}
                    text='Are you sure to delete this pseudo? Pseudo`s vertical will also be deleted. This action cannot be undone.'
                >
                    <Tooltip text='Delete pseudo'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
            {createVertical && (
                <CreateVertical show={createVertical} setShow={setCreateVertical} pseudoId={id} mutate={mutate} />
            )}
        </div>
    )
})

export default memo(PseudoActions)
