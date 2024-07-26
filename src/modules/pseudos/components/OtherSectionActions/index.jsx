import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { VERTICAL_OTHER_SECTION_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const OtherSectionActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-5 flex'>
            <Tooltip text='Edit other section'>
                <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
            </Tooltip>
            <DeleteDialog
                show={show}
                setShow={setShow}
                url={`api/profile/other_section/${id}/`}
                refetch={mutate}
                perm={VERTICAL_OTHER_SECTION_DELETION}
            >
                <Tooltip text='Delete other section'>
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </Tooltip>
            </DeleteDialog>
        </div>
    )
})

export default memo(OtherSectionActions)
