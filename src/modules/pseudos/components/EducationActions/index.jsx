import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { VERTICAL_EDUCATION_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const EducationActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-5 flex'>
            <Tooltip text='Edit education history'>
                <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
            </Tooltip>
            <DeleteDialog
                show={show}
                setShow={setShow}
                url={`api/profile/education/${id}/`}
                refetch={mutate}
                perm={VERTICAL_EDUCATION_DELETION}
            >
                <Tooltip text='Delete education history'>
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </Tooltip>
            </DeleteDialog>
        </div>
    )
})

export default memo(EducationActions)
