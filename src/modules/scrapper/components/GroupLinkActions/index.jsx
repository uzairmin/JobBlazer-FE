import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { GROUP_LINK_DELETION } from '@constants/allowDeletion'

import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const GroupLinkActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 mr-5 flex'>
            {can('edit_job_source_link') && (
                <Tooltip text='Edit experience'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />
                </Tooltip>
            )}
            {can('delete_job_source_link') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/job_scraper/group_scheduler_link/${id}/`}
                    refetch={mutate}
                    perm={GROUP_LINK_DELETION}
                >
                    <Tooltip text='Delete experience'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(GroupLinkActions)
