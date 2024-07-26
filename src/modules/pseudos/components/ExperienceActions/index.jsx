import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { VERTICAL_EXPERIENCE_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const ExperienceActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-5 flex'>
            <Tooltip text='Edit experience'>
                <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
            </Tooltip>
            <DeleteDialog
                show={show}
                setShow={setShow}
                url={`api/profile/experience/${id}/`}
                refetch={mutate}
                perm={VERTICAL_EXPERIENCE_DELETION}
            >
                <Tooltip text='Delete experience'>
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </Tooltip>
            </DeleteDialog>
        </div>
    )
})

export default memo(ExperienceActions)
