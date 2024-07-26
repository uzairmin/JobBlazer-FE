import { memo, useMemo, useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import useSWR from 'swr'

import { Searchbox, EmptyTable, Loading } from '@components'

import { fetchHistory } from '@modules/editHistory/api'
import { ChangesLog, HistoryHeads, HistoryPagination, Unauthorized } from '@modules/editHistory/components'

import { can, formatDate, timeSince } from '@utils/helpers'
import { HISTORY_TYPES } from '@constants/editHistory'

import { BackToIcon } from '@icons'

const EditHistory = () => {
    const { rowId } = useParams()
    const { state } = useLocation()

    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')

    const { data, isLoading, error } = useSWR(
        `/api/job_portal/detect_changes/?instance_id=${rowId}&module=${state?.module}&page=${page}&search=${query}`,
        fetchHistory
    )

    const memoizedBackTo = useMemo(
        () => (
            <Link to={state?.backToUrl || '/profile'} className='text-[#048C8C] flex items-center gap-2 pt-4 md:pt-3'>
                {BackToIcon} Back to {state?.backTo || 'Profile'}
            </Link>
        ),
        [state]
    )

    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col gap-2 px-2 md:px-4'>
            {can(HISTORY_TYPES[state?.module]?.perms) ? (
                <>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <Searchbox ph='Search the history' classes='mb-2' query={query} setQuery={setQuery} />
                        </div>
                        {memoizedBackTo}
                    </div>
                    <div className='max-w-full overflow-x-scroll hide_scrollbar'>
                        <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                            <HistoryHeads />
                            <tbody>
                                {data?.results?.length > 0 && !error ? (
                                    data?.results?.map((row, idx) => (
                                        <tr
                                            className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                            key={row.id}
                                        >
                                            <td className='px-3 py-4 w-10'>{idx + 1}</td>
                                            <td className='md:w-1/6 md:p-3'>
                                                {timeSince(row?.created_at)}
                                                <span className='block text-[13px] mt-3 ml-1 md:mt-0'>
                                                    {formatDate(row?.created_at)}
                                                </span>
                                            </td>
                                            <td className='p-3'>{row?.user?.username}</td>
                                            <td className='md:w-8/12 p-2'>
                                                <ChangesLog data={row?.changes} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <EmptyTable cols={4} msg='No history found yet' />
                                )}
                            </tbody>
                        </table>
                    </div>
                    <HistoryPagination data={data} page={page} set={setPage} />
                </>
            ) : (
                <>
                    {memoizedBackTo}
                    <Unauthorized module={state?.module} />
                </>
            )}
        </div>
    )
}

export default memo(EditHistory)
