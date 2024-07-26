import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, Paginated } from '@components'

import { BlockOrUnblock, JobCompanyCounts } from '@modules/jobComapnies/components'
import { fetchJobCompanies } from '@modules/jobComapnies/api'

import { can } from '@utils/helpers'

const JobCompanies = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const { data, error, isLoading, mutate } = useSWR(
        `/api/job_portal/all_job_companies/?page=${page}&search=${query}`,
        fetchJobCompanies
    )

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto px-5'>
            <div className='flex flex-col md:flex-row items-center pt-6 pb-3 justify-between'>
                <span className='flex items-center space-x-2 mb-3 md:mb-0'>
                    <Searchbox query={query} setQuery={setQuery} reset={setPage} />
                </span>
                <JobCompanyCounts counts={data?.counts} />
            </div>

            <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                {data?.companies?.length > 0 && !error ? (
                    data?.companies?.map((row, idx) => (
                        <div
                            className={`bg-white border ${
                                row?.is_block ? 'border-red-400' : 'border-[#629999f6]'
                            } p-2 relative shadow-lg`}
                            key={idx}
                        >
                            <h2 className='text-sm capitalize mt-3'>{row?.company ?? 'Not Specified'}</h2>
                            {can('block_unblock_job_company') && <BlockOrUnblock row={row} mutate={mutate} />}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No job companies found yet!</span>
                )}
            </div>
            {data?.pages > 0 && (
                <div className='w-full overflow-x-scroll'>
                    <Paginated pages={data?.pages} setPage={setPage} page={page} />
                </div>
            )}
        </div>
    )
}

export default memo(JobCompanies)
