import { memo, useState } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Paginated } from '@components'

import { fetchJobLogs } from '@modules/scrapper/api'

import { formatDate } from '@utils/helpers'
import { LOGS_HEADS } from '@constants/scrapper'
import ScraperAnalytics from '@modules/scrapper/components/ScrapperAnalytics'
import { Filters } from '@/components'

const Logs = () => {
    const [page, setPage] = useState(1)
    const defaulDates = { from_date: '', to_date: '' }
    const [filterState, setFilterState] = useState(defaulDates)
    const [dates, setDates] = useState(defaulDates)
    const { data, isLoading, error } = useSWR(
        `/api/job_scraper/logs/?page=${page}&from_date=${dates.from_date}&to_date=${dates.to_date}`,
        fetchJobLogs
    )

    const runFilter = () => {
        setDates(filterState)
    }

    const resetFilter = () => {
        setFilterState(defaulDates)
        setDates(defaulDates)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full'>
            <div className='mb-2'>
                <ScraperAnalytics
                    job_sources={data?.logs?.job_source_analytics}
                    total_scraped_jobs={data?.logs?.total_scraped_jobs}
                    total_uploaded_jobs={data?.logs?.total_uploaded_jobs}
                />
            </div>

            <div className='mb-2'>
                <div className='grid grid-cols-3 gap-2'>
                    <div className='my-2'>
                        From
                        <input
                            className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                            type='date'
                            max={new Date().toISOString().slice(0, 10)}
                            value={filterState?.from_date}
                            onChange={event =>
                                setFilterState({
                                    ...filterState,
                                    from_date: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className='my-2'>
                        To
                        <input
                            className='block px-2.5 pb-2.5 pt-2.5 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer null'
                            type='date'
                            max={new Date().toISOString().slice(0, 10)}
                            value={filterState?.to_date}
                            onChange={event =>
                                setFilterState({
                                    ...filterState,
                                    to_date: event.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='flex justify-end px-4 align-baseline'>
                        <div className='my-6'>
                            <Filters apply={() => runFilter()} clear={() => resetFilter()} />
                        </div>
                    </div>
                </div>
            </div>

            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {LOGS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.logs?.results?.length > 0 && !error ? (
                        data?.logs?.results?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.job_source}</td>
                                <td className='px-3 py-6'>{row?.total_jobs}</td>
                                <td className='px-3 py-6'>{row?.uploaded_jobs}</td>
                                <td className='px-3 py-6'>{formatDate(row?.created_at)}</td>
                                <td className='px-3 py-6'>{formatDate(row?.updated_at)}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No Logs found yet!' />
                    )}
                </tbody>
            </table>
            <Paginated page={page} setPage={setPage} pages={data?.logs?.num_pages} />
        </div>
    )
}

export default memo(Logs)
