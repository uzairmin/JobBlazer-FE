import { memo, useReducer, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Loading, Paginated } from '@components'

import { fetchNotes, saveNote } from '@modules/leadManagement/api'
import {
    NoteEditForm,
    NoteActions,
    LeadNoteSearch,
    NewNote,
    LeadInfo,
    LeadNote,
} from '@modules/leadManagement/components'

import { decodeJwt } from '@utils/helpers'
import { NOTE_INITIAL_STATE } from '@constants/leadManagement'

const LeadNotes = () => {
    const user = decodeJwt()
    const { id } = useParams()
    const { state } = useLocation()

    const [note, setNote] = useReducer((prev, next) => ({ ...prev, ...next }), {
        ...NOTE_INITIAL_STATE,
        status: state?.status || '',
        phase: state?.phase || '',
    })

    const { data, isLoading, mutate } = useSWR(
        `/api/lead_managament/lead_activity_notes/?lead=${id}&status=${note.status}&phase=${note.phase}&page=${note.page}&search=${note.search}`,
        fetchNotes
    )

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/lead_activity_notes${note.id ? `/${note.id}/` : '/'}`,
        saveNote,
        { lead: id },
        null,
        async formVals =>
            trigger({ ...formVals, id: note.id, notes: note.id ? note.edit : note.msg, attachments: note.attachments }),
        null,
        () => mutate() && setNote({ id: null, msg: '', edit: '', attachments: null })
    )

    if (isLoading) return <Loading />
    return (
        <div className='grid grid-cols-1 md:grid-cols-[70%_30%] px-4 items-baseline'>
            <div className='pr-4'>
                <LeadNoteSearch dispatch={setNote} />
                <NewNote dispatch={setNote} options={{ id, note, user, submitHandler: handleSubmit }} />
                <div className='border pt-8 text-[#1E6570] mt-8 relative border-cyan-200 rounded-lg'>
                    <p className='-mt-12 absolute px-3 mx-3 border bg-[#EDFDFB] text-lg tracking-widest border-cyan-200'>
                        Recent<span className='text-sm'> Notes</span>
                    </p>
                    <div className='px-2 pb-3 md:px-4'>
                        {data?.notes?.length > 0 ? (
                            <div className='flex flex-col'>
                                {data?.notes?.map(row => (
                                    <LeadNote
                                        key={row.id}
                                        note={row}
                                        actions={
                                            <NoteActions row={row} note={note} setNote={setNote} mutate={mutate} />
                                        }
                                        editForm={
                                            <NoteEditForm handleSubmit={handleSubmit} note={note} setNote={setNote} />
                                        }
                                        options={{ note, user }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='text-sm text-gray-600 pl-14 pt-2 pb-2'>No notes added yet...</div>
                        )}

                        {data && data?.notes?.length > 0 && (
                            <Paginated
                                page={note.page}
                                setPage={pageNumber => {
                                    setNote({ page: pageNumber })
                                }}
                                pages={data?.pages}
                            />
                        )}
                    </div>
                </div>
            </div>
            <LeadInfo id={id} />
        </div>
    )
}

export default memo(LeadNotes)
