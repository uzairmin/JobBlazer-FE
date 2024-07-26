import { memo, useState } from 'react'

import { Tooltip, DeleteDialog, Button } from '@components'

import { can } from '@utils/helpers'
import { TEAM_DELETION } from '@constants/allowDeletion'

import { VerticalsAddIcon, EditIcon, TrashIcon } from '@icons'

const TeamActions = ({ id, edit = null, assign = null, mutate = null }) => {
    const [show, setShow] = useState(false)

    return (
        <>
            {can('edit_team') && assign && (
                <Tooltip text='Assign Pesudos'>
                    <span onClick={assign} className='cursor-pointer'>
                        {VerticalsAddIcon}
                    </span>
                </Tooltip>
            )}
            {can('edit_team') && edit && (
                <Tooltip text='Edit Team'>
                    <span onClick={edit} className='cursor-pointer'>
                        {EditIcon}
                    </span>
                </Tooltip>
            )}
            {can('delete_team') && mutate && (
                <DeleteDialog
                    show={show}
                    setShow={setShow}
                    url={`api/auth/team/${id}/`}
                    refetch={mutate}
                    perm={TEAM_DELETION}
                >
                    <Tooltip text='Delete Team'>
                        <Button
                            classes='bg-transparent border-0 !p-0 !-mx-0.5'
                            icon={TrashIcon}
                            onClick={() => setShow(true)}
                        />
                    </Tooltip>
                </DeleteDialog>
            )}
        </>
    )
}
export default memo(TeamActions)
