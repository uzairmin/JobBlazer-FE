import { memo } from 'react'
import useSWR from 'swr'

import { Loading, Modal } from '@components'

import { fetchLogs } from '@modules/teamAppliedJobs/api'

import { formatDate, timeSince } from '@utils/helpers'
import { logsTableHeads } from '@constants/teamAppliedJobs'

import { DownloadIcon } from '@icons'

const MyDownloads = memo(({ show, setShow }) => {
    const { data, isLoading } = useSWR(`api/job_portal/download_logs/`, fetchLogs)

    return isLoading ? (
        <Loading />
    ) : (
        <Modal
            classes='md:w-1/2 lg:w-2/3 xl:w-1/2 2xl:w-1/3'
            show={show}
            setShow={setShow}
            content={
                <div className='w-full ml-4'>
                    <span className='text-[#006366] text-4xl font-semibold'>My Downloads</span>
                    <table className='table-auto text-sm text-gray-500 mt-6 w-full'>
                        <thead className='text-sm text-gray-700 uppercase bg-[#edfdfb] border'>
                            <tr>
                                {logsTableHeads.map(heading => (
                                    <th scope='col' className='px-3 py-5 text-[#006366]' key={heading}>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.results?.length > 0 ? (
                                data?.results?.map((file, index) => (
                                    <tr className='bg-white border border-slate-300 hover:bg-gray-100' key={index}>
                                        <td className='px-3 py-4'>
                                            <span className='font-bold'>{timeSince(file?.created_at)}</span>
                                            <div>{formatDate(file?.created_at)}</div>
                                        </td>
                                        <td className='px-3 py-4'>{file?.user?.name}</td>
                                        <td className='px-3 py-4'>
                                            <a className='underline' target='_blank' rel='noreferrer' href={file?.url}>
                                                {DownloadIcon}
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='3' className='text-center py-4'>
                                        No Download links available yet !!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        />
    )
})

export default MyDownloads
