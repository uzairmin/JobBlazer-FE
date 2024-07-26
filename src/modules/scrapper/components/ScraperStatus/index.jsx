import { memo } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Badge, Button } from '@components'

import { fetchScraperStatus } from '@modules/scrapper/api'

import { formatDate } from '@utils/helpers'
import { JOB_SOURCES, SCRAPER_STATUS_HEADS } from '@constants/scrapper'

import { ResetFilterIcon } from '@icons'

const ScraperStatus = () => {
    const { data, isLoading, error, mutate } = useSWR('/api/job_scraper/scheduler_status/', fetchScraperStatus)

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <div className='flex items-center space-x-4 pb-6'>
                <Button label='Refresh' fit icon={ResetFilterIcon} onClick={() => mutate()} />
            </div>
            <table className='table-auto w-full text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {SCRAPER_STATUS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.length > 0 && !error ? (
                        data?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-20 hover:bg-gray-100' key={idx}>
                                <td className='px-3 py-4'>{idx + 1}</td>
                                <td className='px-3 py-4 capitalize'>
                                    {JOB_SOURCES[row?.job_source] ? JOB_SOURCES[row?.job_source] : row?.job_source}
                                </td>
                                <td className='px-3 py-4 uppercase text-sm italic'>{row?.type}</td>
                                <td className='px-3 py-4'>
                                    {row.running ? (
                                        <div className='flex items-center text-sm gap-2 border w-fit px-3 py-0.5 rounded-full bg-[#359393] text-white'>
                                            <div className='animate-spin w-3 h-3'>
                                                <div className='w-full h-full bg-gray-100' />
                                            </div>
                                            <span>running..</span>
                                        </div>
                                    ) : (
                                        <Badge label='not running' />
                                    )}
                                </td>
                                <td className='px-3 py-4'>
                                    {row.uploading ? (
                                        <div className='flex items-center text-sm gap-2 border w-fit px-3 py-0.5 rounded-full bg-[#359393] text-white'>
                                            <div className='animate-spin w-3 h-3'>
                                                <div className='w-full h-full bg-gray-100' />
                                            </div>
                                            <span>uploading..</span>
                                        </div>
                                    ) : (
                                        <Badge label='not uploading' />
                                    )}
                                </td>
                                <td className='px-3 py-4'>{formatDate(row?.start_time)}</td>
                                <td className='px-3 py-4'>{row?.end_time ? formatDate(row?.end_time) : 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={3} msg='No data found yet!' />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(ScraperStatus)
