import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { StatusActions, StatusForm } from '@modules/leadManagement/components'
import { fetchStatuses } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'

import { CreateIcon } from '@icons'

const Status = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
        query: '',
        page: 1,
        status: null,
        show: false,
    })
    const handleClick = values => dispatch({ status: values, show: !vals.show })

    const { data, error, isLoading, mutate } = useSWR(
        `/api/lead_managament/statuses/?search=${vals.query}&page=${vals.page}`,
        fetchStatuses
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
                    {can('create_status') && (
                        <Button label='Create Status' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                    )}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                {data?.statuses?.length > 0 && !error ? (
                    data?.statuses?.map((row, idx) => (
                        <div className='bg-white border border-[#048C8C] rounded-md p-4 relative' key={idx}>
                            <h2 className='text-lg capitalize pt-2'>{row?.name ?? 'Not Specified'}</h2>
                            {(can('edit_status') || can('delete_status')) && (
                                <StatusActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No statuses found yet!</span>
                )}
            </div>
            {data?.statuses?.length > 24 && (
                <div className='w-full'>
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={value => dispatch({ page: value })}
                        page={vals.page}
                    />
                </div>
            )}
            {(can('create_status') || can('edit_status')) && vals.show && (
                <StatusForm
                    show={vals.show}
                    setShow={value => dispatch({ show: value })}
                    mutate={mutate}
                    status={vals.status}
                />
            )}
        </div>
    )
}

export default memo(Status)
