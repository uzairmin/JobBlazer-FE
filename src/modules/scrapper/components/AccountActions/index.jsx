import { memo, useState } from 'react'

import { Button, DeleteDialog } from '@components'

import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const AccountActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex items-center gap-2'>
            {can('delete_scrapper_account') && (
                <DeleteDialog show={show} setShow={setShow} url={`api/job_scraper/accounts/${id}/`} refetch={mutate}>
                    <Button
                        classes='!p-1 border border-opacity-80'
                        label='Delete'
                        icon={TrashIcon}
                        onClick={() => setShow(true)}
                    />
                </DeleteDialog>
            )}
            {can('edit_scrapper_account') && (
                <Button classes='!p-1 border border-opacity-80' label='Edit' icon={EditIcon} onClick={() => edit()} />
            )}
        </div>
    )
})

export default memo(AccountActions)
