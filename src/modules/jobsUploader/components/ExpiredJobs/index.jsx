import { useState, memo } from 'react'
import useSWR from 'swr'

import { Loading, EmptyTable, Pagination } from '@components'

import { fetchExpiredJobs } from '@modules/jobsUploader/api'
import { ManualJobActions as ExpiredJobActions } from '@modules/jobsUploader/components'

import { formatDate } from '@utils/helpers'
import { MANUAL_JOBS_HEADS as EXPIRED_JOBS_HEADS } from '@constants/jobUploader'

const ExpiredJobs = () => {
    const [page, setPage] = useState(1)

    const { data, error, isLoading, mutate } = useSWR(`api/job_portal/expired_jobs/?page=${page}`, fetchExpiredJobs)

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {EXPIRED_JOBS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.jobs?.length > 0 && !error ? (
                        data?.jobs?.map(row => (
                            <tr
                                className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                key={row?.id}
                            >
                                <td className='p-3 w-32'>{formatDate(row?.job_posted_date)}</td>
                                <td className='p-3'>{row?.job_title}</td>
                                <td className='p-3'>{row?.company_name}</td>
                                <td className='p-3 capitalize'>
                                    <a
                                        className='underline focus:text-black focus:text-lg'
                                        target='_blank'
                                        rel='noreferrer'
                                        href={row?.job_source_url}
                                    >
                                        {row?.job_source}
                                    </a>
                                </td>
                                <td className='p-3'>{row?.tech_keywords}</td>
                                <td className='p-3'>{row?.job_type}</td>
                                <td className='p-3'>
                                    {row?.salary_min || '--'} - {row?.salary_max || '--'}
                                </td>
                                <td>
                                    <ExpiredJobActions
                                        id={row?.id}
                                        mutate={mutate}
                                        expired={row?.expired_at}
                                        editAndDel={false}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={8} msg='No expired Jobs found yet!' />
                    )}
                </tbody>
            </table>
            {data?.pages > 1 && (
                <div className='w-full px-2 py-4 text-end'>
                    <Pagination handleClick={handleClick} next={!data?.next} prev={!data?.prev} />
                </div>
            )}
        </div>
    )
}

export default memo(ExpiredJobs)
