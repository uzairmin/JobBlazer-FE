import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDelete } from '@/hooks'

import { Input, Button } from '@components'

import { ActionButtons } from '@modules/pseudos/components'

const Skills = ({ id, name }) => {
    const redirect = useNavigate()

    const allowDeletionString = name?.toUpperCase()?.replaceAll(' ', '-') || 'DELETE'
    const [confirmInput, setConfirmInput] = useState('')

    const { wait, confirm } = useDelete(`/api/profile/vertical/${id}/`)

    const handleDelete = async () => {
        await confirm()
        if (!wait) redirect('/pseudos')
    }

    return (
        <div className='max-w-full overflow-x-auto mb-2 px-1'>
            <div className='flex flex-col gap-y-2 px-4 py-6 border-2'>
                <p className='tracking-wide text-gray-600 select-none w-full md:!w-1/2'>
                    Please type <strong className='text-red-600 tracking-widest px-1'>{allowDeletionString}</strong> to
                    confirm the deletion of this vertical. It is very risky becuase there must be some jobs or leads
                    which are applied by this vertical. So deleting this vertical will cause data loss. Please be
                    careful. Beacuse this action is irreversible.
                </p>
                <Input
                    classes='w-full md:!w-1/4'
                    value={confirmInput}
                    onChange={e => setConfirmInput(e.target.value)}
                />
                {confirmInput === allowDeletionString && (
                    <div className='mt-1.5 flex gap-4'>
                        <Button
                            fit
                            classes='px-6 !rounded-full text-red-500 border-red-500 hover:bg-red-500'
                            label={wait ? 'Deleting...' : 'Confirm'}
                            disabled={wait}
                            onClick={handleDelete}
                        />
                        <Button
                            fit
                            classes='px-6 !rounded-full text-gray-500 border-gray-500 hover:bg-gray-500'
                            label='Cancel'
                            onClick={() => setConfirmInput('')}
                        />
                    </div>
                )}
            </div>
            <ActionButtons classes='mt-4' />
        </div>
    )
}

export default memo(Skills)
