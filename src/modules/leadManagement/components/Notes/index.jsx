import { memo, useReducer } from 'react'

import { useMutate } from '@/hooks'

import { saveNote } from '@modules/leadManagement/api'
import { NotesFilter, NoteCreateForm, NoteEditForm, NoteActions } from '@modules/leadManagement/components'

import { decodeJwt, formatDate } from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'
import { NOTE_INITIAL_STATE } from '@constants/leadManagement'

const Notes = ({ lead = null, notes = [], status = null, error = null, loading = true, mutate, dispatch = null }) => {
    const user = decodeJwt()
    const [note, setNote] = useReducer((prev, next) => ({ ...prev, ...next }), NOTE_INITIAL_STATE)

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/lead_activity_notes${note.id ? `/${note.id}/` : '/'}`,
        saveNote,
        {},
        null,
        async () => trigger({ id: note.id, notes: note.id ? note.edit : note.msg, lead: lead?.id }),
        null,
        () => mutate() && setNote({ id: null, msg: '', edit: '' })
    )

    return lead ? (
        <div className='border p-2'>
            <p className='text-lg'>Recent Notes</p>
            <hr />
            <NotesFilter
                status={status}
                error={error}
                loading={loading}
                dispatch={dispatch}
                setNote={setNote}
                note={note}
            />
            <NoteCreateForm handleSubmit={handleSubmit} note={note} setNote={setNote} user={user} />
            <div className='pt-3 pl-3'>
                {notes?.length > 0 ? (
                    notes?.map(row => (
                        <div className='flex gap-x-2.5 pb-3.5' key={row.id}>
                            <img
                                alt={row?.user?.name || 'Guest'}
                                src={row?.user?.avatar ?? avatarPlaceholder}
                                onError={e => (e.target.src = avatarPlaceholder)}
                                className='h-9 w-9 rounded-full object-cover shadow-sm'
                            />
                            <div className='flex flex-col w-full gap-y-1'>
                                <div className='flex gap-x-6 items-center w-full'>
                                    <span className='text-sm text-gray-900 capitalize'>
                                        {row?.user?.name || 'guest'}
                                    </span>
                                    <span className='text-xs text-gray-600'>{formatDate(row?.updated_at)}</span>
                                </div>
                                {note.id && note.id === row?.id ? (
                                    <NoteEditForm handleSubmit={handleSubmit} note={note} setNote={setNote} />
                                ) : (
                                    <>
                                        <span>{row.message}</span>
                                        {row?.user?.id === user?.user_id && (
                                            <NoteActions row={row} note={note} setNote={setNote} mutate={mutate} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-sm text-gray-600 pl-14 pt-2'>No notes added yet...</div>
                )}
            </div>
        </div>
    ) : null
}

export default memo(Notes)
