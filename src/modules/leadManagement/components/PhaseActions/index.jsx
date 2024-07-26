import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { PHASE_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const PhaseActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {can('edit_phase') && (
                <Tooltip text='Edit phase'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_phase') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`/api/lead_managament/phases/${id}/`}
                    refetch={mutate}
                    perm={PHASE_DELETION}
                >
                    <Tooltip text='Delete phase'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(PhaseActions)
