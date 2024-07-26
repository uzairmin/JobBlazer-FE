import { memo, useReducer } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'

import { Loading, Searchbox, EmptyTable, Button, Paginated } from '@components'

import { CandidateForm, CandidateActions, CandidateInfo, CandidateFilters } from '@modules/leadManagement/components'
import { fetchCandidates } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'
import { CANDIDATE_HEADS, CANDIDATE_INITIAL_STATE } from '@constants/leadManagement'

import { CreateIcon, DesignationIcon, CandidateFilterIcon } from '@icons'

const Candidates = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), CANDIDATE_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/candidate/?page=${vals.page}&search=${vals.query}`,
        fetchCandidates
    )
    const handleClick = values => dispatch({ show: !vals.show, candidate: values })
    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex justify-between flex-wrap'>
                <div className='flex flex-col md:flex-row md:w-auto md:items-center gap-3'>
                    <Searchbox
                        query={vals.query}
                        setQuery={query => dispatch({ query })}
                        reset={page => dispatch({ page })}
                    />

                    {can('create_candidate') && (
                        <Button label='Create Candidate' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                    )}

                    {can('view_designation') && (
                        <Link to='/designations'>
                            <Button label='Designations' icon={DesignationIcon} />
                        </Link>
                    )}
                </div>

                <div>
                    <Button
                        icon={CandidateFilterIcon}
                        label='Filters'
                        onClick={() => dispatch({ filter: !vals.filter })}
                        fit
                        fill={vals.filter}
                    />
                </div>
            </div>

            {vals.filter && <CandidateFilters filtered={vals} dispatch={dispatch} />}
            <div className='overflow-x-auto w-full hide_scrollbar'>
                <table className='table-auto w-full text-sm text-left text-gray-500 mt-2'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {CANDIDATE_HEADS.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.candidates?.length > 0 && !error ? (
                            data?.candidates?.map((row, idx) => (
                                <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <CandidateInfo info={row} />
                                    <td className='px-3 py-6 float-right'>
                                        {can(['edit_candidate', 'delete_candidate']) && (
                                            <CandidateActions row={row} edit={handleClick} mutate={mutate} />
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={6} msg='No candidates found yet!' />
                        )}
                    </tbody>
                </table>
                {data?.candidates?.length > 24 && (
                    <div className='w-full'>
                        <Paginated
                            pages={data?.pages ?? Math.ceil(data.total / 25)}
                            setPage={page => dispatch({ page })}
                            page={vals.page}
                        />
                    </div>
                )}
            </div>
            {can('edit_candidate') && vals.show && (
                <CandidateForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    candidate={vals.candidate}
                    allRegions={data?.all_regions}
                />
            )}
        </div>
    )
}

export default memo(Candidates)
