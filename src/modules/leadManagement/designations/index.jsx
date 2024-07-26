import { memo, useReducer } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { DesignationActions, DesignationForm } from '@modules/leadManagement/components'
import { fetchDesignations } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'
import { DESIGNATION_INITIAL_STATE } from '@constants/leadManagement'

import { CreateIcon, BackToIcon } from '@icons'

const Designations = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), DESIGNATION_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/designation/?search=${vals.query}&page=${vals.page}`,
        fetchDesignations
    )

    const handleClick = values => dispatch({ show: !vals.show, designation: values })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center py-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                    {can('create_designation') && (
                        <Button label='Create Designation' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                    )}
                </div>
                <Link to='/candidates'>
                    <Button label='Back to Candidates' icon={BackToIcon} />
                </Link>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                {data?.designations?.length > 0 && !error ? (
                    data?.designations?.map((row, idx) => (
                        <div className='bg-white border border-[#048C8C] rounded-md p-4 relative' key={idx}>
                            <h2 className='text-lg'>{row?.title ?? 'N/A'}</h2>
                            {can('edit_designation') && can('delete_designation') && (
                                <DesignationActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            )}
                            <p className='text-sm'>{row?.description ?? 'N/A'}</p>
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No designations found yet!</span>
                )}
            </div>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={page => dispatch({ page })}
                        page={vals.page}
                    />
                </div>
            )}
            {can('edit_designation') && vals.show && (
                <DesignationForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    designation={vals.designation}
                />
            )}
        </div>
    )
}

export default memo(Designations)
