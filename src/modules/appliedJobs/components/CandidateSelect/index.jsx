import { memo, useMemo, useReducer } from 'react'
import useSWR from 'swr'

import { Searchbox, Loading, Badge, Button } from '@components'

import { fetchSelectedCandidates } from '@modules/appliedJobs/api'
import { CandidateFilters } from '@modules/appliedJobs/components'

import { CANDIDATE_SELECT_STATE } from '@constants/leadManagement'

import { CandidateFilterIcon } from '@icons'

const CandidateSelect = ({ selected = null, handleSelect = null }) => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), CANDIDATE_SELECT_STATE)

    const { data, error, isLoading } = useSWR(
        `/api/candidate_management/selected_candidate/?search=${vals.query}&skills=${vals.skills}&designations=${vals.designations}&regions=${vals.regions}`,
        fetchSelectedCandidates
    )

    const handleChange = ({ target: { value } }) => {
        dispatch({ candidate_id: value })
        handleSelect('candidate', value)
    }

    useMemo(() => {
        if (selected) dispatch({ candidate_id: selected?.toString() })
        return () => {}
    }, [])

    if (isLoading) return <Loading />
    return error ? (
        <div className='text-lg mx-auto my-3'>Failed to load candidates...</div>
    ) : (
        <div className='max-w-full'>
            <div className='flex flex-col py-3'>
                <div className='flex items-center justify-between pb-2 gap-2'>
                    <div className='flex items-center gap-2'>
                        <Searchbox
                            query={vals.query}
                            setQuery={query => dispatch({ query })}
                            clear={() => dispatch({ query: '', skills: '', designations: '', regions: '' })}
                        />
                    </div>
                    <Button
                        icon={CandidateFilterIcon}
                        label='Filters'
                        classes='!font-bold'
                        onClick={() => dispatch({ show: !vals.show })}
                        fit
                    />
                </div>
                {vals.show && <CandidateFilters options={data} selected={vals} dispatch={dispatch} />}
            </div>
            {data?.candidates?.length > 0 ? (
                <div className='grid grid-cols-2 gap-1.5'>
                    {data?.candidates?.map((row, index) => (
                        <div className='bg-white border flex py-3 items-start px-3' key={index}>
                            <div className='flex items-center gap-2 w-1/3'>
                                <input
                                    type='radio'
                                    checked={vals?.candidate_id === row.id.toString()}
                                    value={row.id.toString()}
                                    className='__checkbox'
                                    onChange={handleChange}
                                />
                                <span className='capitalize'>{row?.name ?? 'N/A'}</span>
                            </div>
                            <span className='uppercase w-28'>
                                <Badge label={row?.designation?.name ?? 'N/A'} classes='text-xs' />
                            </span>
                            <div className='flex flex-wrap gap-1 w-2/3'>
                                {row?.skills?.map((s, idx) => (
                                    <Badge
                                        label={s.name}
                                        classes='text-xs border border-green-300'
                                        type='success'
                                        key={idx}
                                    />
                                ))}
                            </div>
                            <small className='text-xs'>{row?.regions?.map(r => `${r.name}`)?.join(',')}</small>
                        </div>
                    ))}
                </div>
            ) : (
                <span className='italic'>No candidates found yet!</span>
            )}
        </div>
    )
}

export default memo(CandidateSelect)
