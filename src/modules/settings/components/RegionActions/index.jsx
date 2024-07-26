import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { REGION_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const RegionActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {can('edit_region') && (
                <Tooltip text='Edit region'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_region') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/candidate_management/regions/${id}/`}
                    refetch={mutate}
                    perm={REGION_DELETION}
                >
                    <Tooltip text='Delete region'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(RegionActions)
