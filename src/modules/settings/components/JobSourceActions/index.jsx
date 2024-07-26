import { memo, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { Button, DeleteDialog } from '@components'

import { DYNAMIC_JOB_SOURCE_DELETION } from '@constants/allowDeletion'
import { can, isset } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const JobSourceActions = memo(({ edit = null, id, refetch }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='absolute top-0 right-0 pl-2 mr-1 flex'>
            {isset(edit) && can('edit_job_source') && (
                <>
                    <Button classes={`_icon-btn edit-${id}`} icon={EditIcon} onClick={() => edit()} />
                    <Tooltip anchorSelect={`.edit-${id}`} content='Edit Job Source' />
                </>
            )}
            {isset(id) && can('delete_job_source') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/job_scraper/job_source/${id}/`}
                    refetch={refetch}
                    perm={DYNAMIC_JOB_SOURCE_DELETION}
                >
                    <Button classes={`_icon-btn del-${id}`} icon={TrashIcon} onClick={() => setShow(true)} />
                    <Tooltip anchorSelect={`.del-${id}`} content='Delete Job Source' />
                </DeleteDialog>
            )}
        </div>
    )
})

export default memo(JobSourceActions)
