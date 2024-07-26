import { memo, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Textarea, Button, Tooltip } from '@components'

import { EMOJIS } from '@constants/leadManagement'
import { MAX_FILE_SIZE } from '@constants/profile'

const NoteEditForm = ({ note, handleSubmit, setNote }) => {
    const [showEmo, setShowEmo] = useState(false)
    const [upload, setUpload] = useState(false)
    const handleEditChange = e => setNote({ edit: e.target.value })

    const memoized = useMemo(
        () => (
            <form onSubmit={handleSubmit}>
                <Textarea ph='Type your notes' rows={2} value={note.edit} onChange={handleEditChange} />
                {note.edit.length > 0 && note.id && (
                    <div className='space-x-2 float-right'>
                        <Button label='Update' classes='!py-1' type='submit' fit fill />
                        <Button label='Cancel' classes='!py-1' fit onClick={() => setNote({ id: null, edit: '' })} />
                    </div>
                )}
            </form>
        ),
        [note]
    )

    const updateAttachment = e => {
        const file = e.target.files[0]
        if (file.size > MAX_FILE_SIZE) {
            toast.error(`File size is too large. Max size: ${Math.ceil(MAX_FILE_SIZE / (1024 * 1024))} MBs.`)
            e.target.value = null
        } else {
            setNote({ attachments: file })
        }
    }

    return (
        <>
            {memoized}
            <div className='relative w-fit -mt-8'>
                <span className='border-2 rounded-2xl px-1 py-1.5 cursor-pointer' onClick={() => setShowEmo(!showEmo)}>
                    {EMOJIS[0]}
                </span>
                {showEmo && (
                    <div className='absolute top-9 left-0 z-10 flex flex-wrap items-center gap-3 border rounded-3xl w-72 p-3 bg-white shadow-xl  border-slate-300'>
                        {EMOJIS.map(emoji => (
                            <span
                                onClick={() => setNote({ edit: `${note?.edit} ${emoji}` })}
                                className='cursor-pointer'
                                key={emoji}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                )}
                {upload ? (
                    <label className='inline-flex ml-2'>
                        <span className='sr-only'>Attach file</span>
                        <input
                            type='file'
                            accept='.jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx, .zip'
                            onChange={updateAttachment}
                            className='block w-full text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:text-white file:font-semibold file:bg-[#329988] hover:file:bg-[#4ab9a7]'
                        />
                        <Button
                            label='Cancel'
                            classes='!py-0.5 bg-slate-200 border-0 !text-gray-500 hover:bg-slate-200 hover:border-0 hover:!text-gray-500'
                            fit
                            fill
                            onClick={() => setUpload(false)}
                        />
                    </label>
                ) : (
                    <span className='inline-flex ml-2'>
                        <div className='flex items-center'>
                            <span className='text-sm text-slate-500 italic'>{note?.editAttachments?.filename}</span>
                            <Tooltip
                                text={`${
                                    note?.editAttachments?.filename
                                        ? 'By uploading new file, previous file will be deleted'
                                        : 'Upload new file'
                                }`}
                            >
                                <Button
                                    label={`${note?.editAttachments?.filename ? 'Attach new File' : 'Attach File'}`}
                                    classes='!py-0.5 ml-2'
                                    fit
                                    fill
                                    onClick={() => setUpload(true)}
                                />
                            </Tooltip>
                        </div>
                    </span>
                )}
            </div>
        </>
    )
}

export default memo(NoteEditForm)
