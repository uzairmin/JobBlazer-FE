import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { VERTICAL_SKILL_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const SkillActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-2 flex'>
            <Tooltip text='Edit skill'>
                <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
            </Tooltip>
            <DeleteDialog
                show={show}
                setShow={setShow}
                url={`api/profile/skill/${id}/`}
                refetch={mutate}
                perm={VERTICAL_SKILL_DELETION}
            >
                <Tooltip text='Delete skill'>
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </Tooltip>
            </DeleteDialog>
        </div>
    )
})

export default memo(SkillActions)
