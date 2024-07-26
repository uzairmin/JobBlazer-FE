import { memo, useState } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Tooltip, Paginated, Searchbox } from '@components'

import { fetchErrorLogs } from '@modules/logger/api'

import { can, formatDate } from '@utils/helpers'
import { FilterForm } from '@modules/logger/components/'

import { ERROR_LOGGER_HEADS } from '@constants/logger'

const Logger = () => {
    const [pageInfo, setPageInfo] = useState({ page: 1 })
    const [query, setQuery] = useState('')
    const [filterShow, setFilterShow] = useState(false)
    const defaultFilters = { logTypes: [], requestTypes: [] }
    const [filters, setfilters] = useState(defaultFilters)
    const formatArray = arr => arr.map(item => item.value).toString()
    const { data, isLoading, error } = useSWR(
        `/api/error_logger/error_logs/?search=${query}&page=${pageInfo?.page}&logsTypes=${formatArray(
            filters?.logTypes
        )}&requestTypes=${formatArray(filters?.requestTypes)}`,
        fetchErrorLogs
    )

    if (isLoading) return <Loading />

    const handleFilter = () => {
        setPageInfo({ ...pageInfo, page: 1 })
        setFilterShow(!filterShow)
    }

    return (
        <div className='min-h-screen'>
            <div className='max-w-full overflow-x-auto shadow-md text-sm sm:rounded-lg px-2'>
                <div className='flex items-center space-x-4 pb-6'>
                    <Searchbox
                        query={query}
                        setQuery={text => {
                            setQuery(text)
                            setPageInfo({ ...pageInfo, page: 1 })
                        }}
                        apply={() => {
                            setPageInfo({ ...pageInfo, page: 1 })
                            handleFilter()
                        }}
                        clear={() => {
                            setQuery('')
                            setPageInfo({ ...pageInfo, page: 1 })
                            setfilters(defaultFilters)
                        }}
                    />
                </div>
                <table className='table-auto w-full table h-100 text-left text-[#048C8C]'>
                    <thead className='uppercase border border-[#048C8C]'>
                        <tr>
                            {ERROR_LOGGER_HEADS.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {data?.errors?.length > 0 && !error ? (
                            data?.errors?.map((row, idx) => (
                                <tr className='border-b border-[#006366] border-opacity-20 hover:bg-gray-100' key={idx}>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>{row?.log_message}</td>
                                    <td
                                        className={`px-3 py-3.5 text-ellipsis w-25 h-25 ${
                                            row?.user ? 'cursor-pointer' : ''
                                        }`}
                                    >
                                        {row?.user ? (
                                            <Tooltip text={`email: ${row?.user?.email}`} down>
                                                {row?.user?.username}
                                            </Tooltip>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>{row?.level}</td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>
                                        {row?.error_message ? row.error_message : '-'}
                                    </td>
                                    <td
                                        className={`px-3 py-3.5 text-ellipsis w-25 h-25 ${
                                            row?.traceback ? 'cursor-pointer' : ''
                                        }`}
                                    >
                                        {row?.traceback ? (
                                            <Tooltip text={`traceback: ${row?.traceback}`} down>
                                                {row?.error_line}
                                            </Tooltip>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>
                                        {row?.path ? row.path : '-'}
                                    </td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>
                                        {row?.line_number ? row.line_number : '-'}
                                    </td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>
                                        {row?.method ? row.method : '-'}
                                    </td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>
                                        {row?.status_code ? row.status_code : '-'}
                                    </td>
                                    <td className='px-3 py-3.5 text-ellipsis w-25 h-25'>{formatDate(row?.time)}</td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={11} msg='No logs found yet!' />
                        )}
                    </tbody>
                </table>

                {filterShow && (
                    <FilterForm
                        show={filterShow}
                        setShow={setFilterShow}
                        filters={filters}
                        setfilters={filtersData => {
                            setPageInfo({ ...pageInfo, page: 1 })
                            setfilters(filtersData)
                        }}
                        resetForm={() => {
                            setQuery('')
                            setPageInfo({ ...pageInfo, page: 1 })
                            setfilters(defaultFilters)
                        }}
                    />
                )}

                {data && data?.errors?.length > 0 && (
                    <Paginated
                        page={pageInfo?.page}
                        setPage={pageNumber => {
                            setPageInfo({ ...pageInfo, page: pageNumber })
                        }}
                        pages={data?.links?.num_pages}
                    />
                )}
            </div>
        </div>
    )
}

export default memo(Logger)
