import { memo, useState } from 'react'

import { Button, DeleteDialog } from '@components'

import { TrashIcon, EditIcon } from '@icons'

const JobActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex items-center'>
            <DeleteDialog show={show} setShow={setShow} url={`api/job_scraper/scheduler/${id}/`} refetch={mutate}>
                <Button classes='bg-transparent border-0 px-0' icon={TrashIcon} onClick={() => setShow(true)} />
            </DeleteDialog>

            <Button classes='bg-transparent border-0 px-0' icon={EditIcon} onClick={() => edit()} />
        </div>
    )
})

export default memo(JobActions)
