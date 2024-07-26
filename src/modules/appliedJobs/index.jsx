import { memo, useState, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Badge } from '@components'

import { fetchAppliedJobs } from '@modules/appliedJobs/api'
import { fetchDropdownVals } from '@modules/teamAppliedJobs/api'
import { EmptyTable, Searchbox, TableNavigate, AppliedJobActions, Filters } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus, APPLIED_JOBS_FILTERS_INITIAL_VALS } from '@constants/appliedJobs'
import { formatDate, timeSince, parseLinks } from '@utils/helpers'

const AppliedJobs = memo(({ userId = '' }) => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), APPLIED_JOBS_FILTERS_INITIAL_VALS)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()

    const { data, error, isLoading } = useSWR(
        `api/job_portal/applied_jobs/?end_date=${vals.to}&page=${page}&job_type=${parseLinks(
            vals.types
        ).join()}&job_source=${parseLinks(vals.sources).join()}&start_date=${vals.from}&tech_keywords=${parseLinks(
            vals.stacks
        ).join()}`,
        fetchAppliedJobs
    )
    const { data: dropdownvals } = useSWR(`api/job_portal/applied_job_filters/`, fetchDropdownVals)
    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    if (isLoading) return <Loading />
    return (
        <div>
            <div className='max-w-full shadow-md sm:rounded-lg mb-14 px-2.5'>
                <Searchbox
                    query={query}
                    setQuery={setQuery}
                    setPage={setPage}
                    reset={pg => dispatch({ page: pg })}
                    toggle={() => dispatch({ filter: !vals.filter })}
                    filter={vals.filter}
                    last12HoursJobsCount={data?.last_12_hours_count ?? 0}
                />
                {vals.filter && (
                    <Filters filtered={vals} dispatch={dispatch} agent={userId === ''} dropdowns={dropdownvals} />
                )}
                <div className='overflow-x-auto w-full hide_scrollbar'>
                    <table className='table-auto w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-[#edfdfb] border'>
                            <tr>
                                {tableHeads.map(heading => (
                                    <th scope='col' className='px-3 py-4 text-[#006366]' key={heading}>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.jobs?.length > 0 && !error ? (
                                data?.jobs?.map((job, index) => (
                                    <tr className='bg-white border-y border-slate-300 hover:bg-gray-100' key={index}>
                                        <td className='p-3'>
                                            <span className='font-bold'>{timeSince(job?.applied_date)}</span>
                                            <div>{formatDate(job?.applied_date)}</div>
                                        </td>
                                        <td className='p-3'>{job?.company_name}</td>
                                        <td className='p-3 cursor-pointer underline'>
                                            <a href={job?.job_source_url} target='_blank' rel='noopener noreferrer'>
                                                {job?.job_title}
                                            </a>
                                        </td>
                                        <td className='p-3'>{job?.job_source}</td>
                                        <td className='p-3'>
                                            <Badge label={job?.tech_keywords} />
                                        </td>
                                        <td className='p-3'>{job?.job_type}</td>
                                        <td className='w-28 py-4'>
                                            <Badge label={jobStatus[job?.status]} type='success' />
                                        </td>
                                        <td className='p-3 capitalize'>{userId ? 'ME' : job?.applied_by_name}</td>
                                        <td className='p-3 font-extrabold'>{job?.pseudo?.name ?? 'N/A'}</td>
                                        <td className='p-3 font-semibold'>{job?.vertical?.name ?? 'N/A'}</td>
                                        <td className='p-3'>
                                            <AppliedJobActions job={job} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyTable />
                            )}
                        </tbody>
                    </table>
                    {data?.jobs?.length > 0 && !error && (
                        <TableNavigate data={data} page={page} handleClick={handleClick} />
                    )}
                </div>
            </div>
        </div>
    )
})

export default AppliedJobs
