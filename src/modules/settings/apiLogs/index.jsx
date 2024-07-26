import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Paginated, Button } from '@components'

import { fetchApiLogs } from '@modules/settings/api'
import { ApiLogFilters, ApiLogsAnalytics } from '@modules/settings/components'

import { formatDate, getSelectedVals, convertToTitleCase } from '@utils/helpers'
import { API_LOGS_HEADS, API_LOGS_INITIAL_VALUES } from '@constants/settings'
import { JOB_SOURCES } from '@constants/scrapper'

import { CandidateFilterIcon, ValidateTrueIcon, ValidateFalseIcon } from '@icons'

const ApiLogs = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), API_LOGS_INITIAL_VALUES)
    const { data, error, isLoading } = useSWR(
        `/api/job_portal/sales_engine_logs/?page=${vals.page}&search=${vals.query}&from_date=${vals.from}&to_date=${
            vals.to
        }&job_sources=${getSelectedVals(vals.sources)}`,
        fetchApiLogs
    )

    const clearFilters = () => dispatch({ filter: false, sources: [], page: 1, query: '', from: '', to: '' })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <ApiLogsAnalytics stats={data?.stats} />
            <div className='flex items-center space-x-3 pt-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query, page: 1 })} clear={clearFilters} />
                <Button
                    icon={CandidateFilterIcon}
                    label='Filters'
                    onClick={() => dispatch({ filter: !vals.filter, page: 1 })}
                    fit
                    fill={vals.filter}
                />
            </div>
            {vals.filter && <ApiLogFilters filtered={vals} dispatch={dispatch} />}
            <div className='overflow-x-auto w-full hide_scrollbar'>
                <table className='table-auto w-full text-sm text-left text-[#048C8C] mt-3'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {API_LOGS_HEADS.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.logs?.length > 0 && !error ? (
                            data?.logs?.map((row, idx) => (
                                <tr className='bg-white border-b border-[#006366] border-opacity-30' key={idx}>
                                    <td className='p-3 break-words'>{row?.id}</td>
                                    <td className='p-3 break-words'>
                                        {row?.source === 'SalesEngineLogsNaming.PRODUCTION_TO_SALES_ENGINE'
                                            ? 'Production --> Sales Engine'
                                            : 'Staging --> Production'}
                                    </td>
                                    <td className='p-3 break-words capitalize'>
                                        {JOB_SOURCES[row?.job_source ?? 'other'] ?? convertToTitleCase(row?.job_source)}
                                    </td>
                                    <td className='p-3 break-words'>{formatDate(row?.created_at)}</td>
                                    <td className='px-4 py-3 break-words text-md'>{row?.jobs_count || 0}</td>
                                    <td className='p-3 text-2xl font-bold'>
                                        {row?.upload_status ? ValidateTrueIcon : ValidateFalseIcon}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={4} msg='No logs found yet!' />
                        )}
                    </tbody>
                </table>
            </div>
            {data?.pages > 1 && data?.logs && (
                <div className='w-full'>
                    <Paginated pages={data?.pages} setPage={page => dispatch({ page })} page={vals.page} />
                </div>
            )}
        </div>
    )
}

export default memo(ApiLogs)
