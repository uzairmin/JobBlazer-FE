import { React, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, EmptyTable, Button } from '@components'

import { fetchManualJobs } from '@modules/jobsUploader/api'
import { CreateJobForm, ManualJobActions } from '@modules/jobsUploader/components'
import { EditJobForm } from '@modules/jobsFilter/components'

import { can, formatDate } from '@utils/helpers'
import { MANUAL_JOBS_HEADS } from '@constants/jobUploader'

import { CreateIcon } from '@icons'

const ManualJobs = () => {
    const [job, setJob] = useReducer((state, value) => ({ ...state, ...value }), {
        show: false,
        createShow: false,
        data: null,
    })
    const { data, error, isLoading, mutate } = useSWR('api/job_portal/manual_jobs/', fetchManualJobs)

    const handleClick = values => setJob({ data: values, show: true })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <div className='flex items-center py-3 justify-end'>
                {can(['create_manual_job']) && (
                    <Button label='Create a Job' fit icon={CreateIcon} onClick={() => setJob({ createShow: true })} />
                )}
            </div>
            <div className='overflow-x-auto'>
                <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {MANUAL_JOBS_HEADS.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.jobs?.length > 0 && !error ? (
                            data.jobs.map(row => (
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
                                        <ManualJobActions
                                            id={row?.id}
                                            mutate={mutate}
                                            expired={row?.expired_at}
                                            edited={row?.edited}
                                            edit={() => handleClick(row)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={6} msg='No Jobs found yet!' />
                        )}
                    </tbody>
                </table>
            </div>
            {job.createShow && (
                <CreateJobForm show={job.createShow} setShow={show => setJob({ createShow: show })} mutate={mutate} />
            )}
            {job.show && <EditJobForm job={job} mutate={mutate} set={setJob} />}
        </div>
    )
}

export default ManualJobs
