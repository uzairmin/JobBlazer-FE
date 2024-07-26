import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { RegionActions, RegionForm } from '@modules/settings/components'
import { fetchRegions } from '@modules/settings/api'

import { can } from '@utils/helpers'
import { REGIONS_INITIAL_VALUES } from '@constants/settings'

import { CreateIcon } from '@icons'

const Regions = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), REGIONS_INITIAL_VALUES)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/regions/?search=${vals.query}&page=${vals.page}`,
        fetchRegions
    )

    const handleClick = values => dispatch({ region: values, show: !vals.show })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center pt-3 pb-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                    {can('create_region') && (
                        <Button label='Create Region' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                    )}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-5'>
                {data?.regions?.length > 0 && !error ? (
                    data?.regions?.map((row, idx) => (
                        <div className='bg-white border border-[#048C8C] rounded-md p-4 relative' key={idx}>
                            <h2 className='text-lg'>{row?.region ?? 'Not Specified'}</h2>
                            {can('edit_region') && can('delete_region') && (
                                <RegionActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No regions found yet!</span>
                )}
            </div>
            {data?.pages > 1 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages} setPage={page => dispatch({ page })} page={vals.page} />
                </div>
            )}
            {can('create_region') && vals.show && (
                <RegionForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    region={vals.region}
                />
            )}
        </div>
    )
}

export default memo(Regions)
