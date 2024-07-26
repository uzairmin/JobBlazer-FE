import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { PhaseActions, PhaseForm } from '@modules/leadManagement/components'
import { fetchPhases } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'

import { CreateIcon } from '@icons'

const Phases = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
        query: '',
        page: 1,
        phase: null,
        show: false,
    })
    const handleClick = values => dispatch({ phase: values, show: !vals.show })

    const { data, error, isLoading, mutate } = useSWR(
        `/api/lead_managament/phases/?search=${vals.query}&page=${vals.page}`,
        fetchPhases
    )

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center py-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox
                        query={vals.query}
                        setQuery={value => dispatch({ query: value })}
                        reset={page => dispatch({ page })}
                    />
                    {can('create_phase') && (
                        <Button label='Create Phase' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                    )}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                {data?.phases?.length > 0 && !error ? (
                    data?.phases?.map((row, idx) => (
                        <div className='bg-white border border-[#048C8C] rounded-md p-4 relative' key={idx}>
                            <h2 className='text-lg capitalize pt-2'>{row?.name ?? 'Not Specified'}</h2>
                            <h2 className='text-sm capitalize text-gray-500'>
                                {row?.company_status?.status?.name ?? 'N/A'}
                            </h2>
                            {(can('edit_phase') || can('delete_phase')) && (
                                <PhaseActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No phases found yet!</span>
                )}
            </div>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={value => dispatch({ page: value })}
                        page={vals.page}
                    />
                </div>
            )}
            {(can('create_phase') || can('edit_phase')) && vals.show && (
                <PhaseForm
                    show={vals.show}
                    setShow={value => dispatch({ show: value })}
                    mutate={mutate}
                    phase={vals.phase}
                />
            )}
        </div>
    )
}

export default memo(Phases)
