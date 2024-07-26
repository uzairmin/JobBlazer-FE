import { memo, useMemo } from 'react'

import { DeleteDialog } from '@components'

const NoteActions = ({ row, note, setNote, mutate }) => {
    const memoized = useMemo(
        () => (
            <span className='flex gap-x-2 font-semibold text-gray-500'>
                <small
                    className='underline cursor-pointer'
                    onClick={() =>
                        setNote({
                            id: row?.id,
                            edit: row?.message,
                            msg: '',
                            editAttachments: row?.attachments,
                            attachments: null,
                        })
                    }
                >
                    Edit
                </small>
                <DeleteDialog
                    show={note.show}
                    setShow={val => setNote({ show: val })}
                    url={`/api/lead_managament/lead_activity_notes/${row?.id}/`}
                    refetch={mutate}
                    perm
                >
                    <small className='underline cursor-pointer' onClick={() => setNote({ show: true })}>
                        Delete
                    </small>
                </DeleteDialog>
            </span>
        ),
        [row]
    )
    return memoized
}

export default memo(NoteActions)
