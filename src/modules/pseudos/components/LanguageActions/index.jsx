import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { VERTICAL_LANGUAGE_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const LanguageActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-4 flex'>
            <Tooltip text='Edit language'>
                <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
            </Tooltip>
            <DeleteDialog
                show={show}
                setShow={setShow}
                url={`api/profile/language/${id}/`}
                refetch={mutate}
                perm={VERTICAL_LANGUAGE_DELETION}
            >
                <Tooltip text='Delete language'>
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </Tooltip>
            </DeleteDialog>
        </div>
    )
})

export default memo(LanguageActions)
