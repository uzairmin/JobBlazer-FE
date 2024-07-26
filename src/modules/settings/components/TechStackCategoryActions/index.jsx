import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { TECH_STACK_CATEGORY_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const TechStackCategoryActions = ({ row, edit, mutate }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='pl-2 mr-1 flex'>
            {can('edit_tech_stacks_categories') && (
                <Tooltip text='Edit Tech Stack Category'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit(row)} />
                </Tooltip>
            )}
            {can('delete_tech_stacks_categories') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`/api/job_portal/trends_analytics/${row.id}/`}
                    refetch={mutate}
                    perm={TECH_STACK_CATEGORY_DELETION}
                >
                    <Tooltip text='Delete Tech Stack Category'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
}

export default memo(TechStackCategoryActions)
