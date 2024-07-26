import { memo } from 'react'

import { CustomSelector, Button } from '@components'

import { parseSelectedStatus, parseStatuses, parseStatusPhases, parseSelectedStatusPhase } from '@utils/helpers'

const NotesFilter = ({ status = null, error = null, loading = true, dispatch = null, setNote = null, note }) => {
    const filterNotes = () => dispatch({ status: note.status, phase: note.phase })
    const clearFilters = () => setNote({ status: '', phase: '' }) && dispatch({ status: '', phase: '' })

    return (
        <div className='flex items-center justify-between mt-2 p-2 text-sm bg-cyan-50'>
            <div className='flex gap-2.5 items-center w-full'>
                <span>Show:</span>
                {loading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>Error to Load statuses</span>
                ) : (
                    <>
                        <div className='w-1/4'>
                            <CustomSelector
                                options={parseStatuses(status)}
                                handleChange={({ value }) => setNote({ status: value, phase: '' })}
                                selectorValue={parseSelectedStatus(note.status, status)}
                                placeholder='Select Status'
                            />
                        </div>
                        {note.status && (
                            <div className='w-1/4'>
                                <CustomSelector
                                    options={parseStatusPhases(note.status, status)}
                                    handleChange={({ value }) => setNote({ phase: value })}
                                    selectorValue={parseSelectedStatusPhase(note.phase, note.status, status)}
                                    placeholder='Select Phase'
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            <Button label='Get' fit classes='!float-right !py-1' onClick={filterNotes} />
            <Button label='Clear' fit classes='!float-right !py-1 ml-1.5' onClick={clearFilters} />
        </div>
    )
}

export default memo(NotesFilter)
