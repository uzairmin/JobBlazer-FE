import { memo, useMemo } from 'react'

import { Textarea, Button } from '@components'

import { avatarPlaceholder } from '@constants/profile'

const NoteCreateForm = ({ handleSubmit = null, note, setNote = null, user = null }) => {
    const handleChange = e => setNote({ id: null, msg: e.target.value, edit: '' })

    const memoized = useMemo(
        () => (
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-[auto_1fr] pt-2.5 gap-x-2.5'>
                    <img
                        alt={user?.username}
                        src={user?.file_url ?? avatarPlaceholder}
                        onError={e => (e.target.src = avatarPlaceholder)}
                        className='h-12 w-12 rounded-full object-cover shadow-sm'
                    />
                    <Textarea name='notes' ph='Type your notes' rows={2} value={note.msg} onChange={handleChange} />
                </div>
                {note.msg.length > 0 && !note.id && (
                    <div className='mt-2 space-x-2 float-right'>
                        <Button label='Save' classes='!py-1' type='submit' fit fill />
                        <Button label='Clear' classes='!py-1' fit onClick={() => setNote({ id: null, msg: '' })} />
                    </div>
                )}
            </form>
        ),
        [note]
    )

    return memoized
}

export default memo(NoteCreateForm)
