import { memo, useState } from 'react'

import { Button, DeleteDialog } from '@components'

import { can } from '@utils/helpers'
import { GROUP_SETTING_DELETION } from '@constants/allowDeletion'

import { TrashIcon, EditIcon } from '@icons'

const GroupSettingActions = memo(({ id, edit, mutate }) => {
    const [show, setShow] = useState(false)

    return (
        <div className='flex items-center'>
            {can('delete_cronjob_setting') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/job_scraper/group_scheduler/${id}/`}
                    refetch={mutate}
                    perm={GROUP_SETTING_DELETION}
                >
                    <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                </DeleteDialog>
            )}
            {can('edit_cronjob_setting') && <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit()} />}
        </div>
    )
})

export default memo(GroupSettingActions)
