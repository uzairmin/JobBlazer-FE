import { memo, useState } from 'react'

import { Button, DeleteDialog, Tooltip } from '@components'

import { EXPOSED_TEAM_DELETION } from '@constants/allowDeletion'
import { can } from '@utils/helpers'

import { TrashIcon, EditIcon } from '@icons'

const ExposedTeamsActions = ({ row, edit, mutate }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='pl-2 mr-1 flex'>
            {can('view_exposed_candidate') && (
                <Tooltip text='Edit Tech Stack Category'>
                    <Button classes='_icon-btn' icon={EditIcon} onClick={() => edit(row)} />
                </Tooltip>
            )}
            {can('view_exposed_candidate') && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/candidate_management/candidate_teams/${row?.id}/`}
                    refetch={mutate}
                    perm={EXPOSED_TEAM_DELETION}
                >
                    <Tooltip text='Delete Tech Stack Category'>
                        <Button classes='_icon-btn' icon={TrashIcon} onClick={() => setShow(true)} />
                    </Tooltip>
                </DeleteDialog>
            )}
        </div>
    )
}

export default memo(ExposedTeamsActions)
