import { memo, useState, useRef, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr'

import { Button, Input } from '@components'

import { syncNow, getScrapperCycleStatus, toggleScrapperCycleStatus } from '@modules/scrapper/api'
import { fetchJobSources } from '@modules/settings/api'

import { RunScrapperIcon, PauseIcon } from '@icons'

const SyncNow = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const divRef = useRef(null)

    const {
        data: sourcesData,
        error,
        isLoading: sourcesLoading,
    } = useSWR('api/job_scraper/job_source/', fetchJobSources)

    const { data, isLoading, mutate } = useSWRImmutable('api/job_scraper/sync_scheduler/', getScrapperCycleStatus)

    const { isMutating: isMutating1, trigger: trigger1 } = useSWRMutation(
        ['/api/job_scraper/sync/', 'single-job-source'],
        syncNow,
        {
            shouldRetryOnError: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    const { isMutating: isMutating2, trigger: trigger2 } = useSWRMutation(
        'api/job_scraper/sync_scheduler/',
        toggleScrapperCycleStatus,
        {
            shouldRetryOnError: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            onSuccess: () => mutate(),
        }
    )

    const runSingleScraper = source => {
        trigger1({ link: `/api/job_scraper/sync/?job_source=${source}` })
        setIsOpen(!isOpen)
    }

    const handleClickOutside = event => {
        if (divRef.current && !divRef.current.contains(event.target)) setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return (
        <div className='relative inline-block text-left' ref={divRef}>
            <div className='flex'>
                {!sourcesLoading && (
                    <Button
                        label={isMutating1 ? 'Running........' : 'Run Scrapper Now'}
                        fit
                        icon={RunScrapperIcon}
                        onClick={() => setIsOpen(!isOpen)}
                        disabled={isMutating1}
                        classes='mx-2'
                    />
                )}
                {!isMutating2 && !isLoading && (
                    <Button
                        label={data ? 'Stop ' : 'Start '}
                        fit
                        icon={data ? PauseIcon : RunScrapperIcon}
                        onClick={() => trigger2()}
                        disabled={isLoading}
                        fill={!data}
                        classes='disabled:opacity-25'
                    />
                )}
            </div>
            {isOpen && (
                <div
                    className='origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-cyan-600  focus:outline-none text-[#048C8C] max-h-96 overflow-y-scroll'
                    tabIndex={-1}
                >
                    <div className='p-1 flex flex-col'>
                        <Input
                            ph='Search by typing..'
                            classes='!h-8'
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                        />
                        {sourcesData?.sources?.length > 0 && !error ? (
                            sourcesData?.sources
                                ?.filter(row =>
                                    query !== '' ? row?.name?.toLowerCase().includes(query?.toLowerCase()) : row
                                )
                                ?.map(({ name, key }) => (
                                    <button
                                        className='text-start px-2 py-2 text-sm hover:bg-gray-100'
                                        onClick={() => runSingleScraper(key)}
                                        disabled={isMutating1}
                                        key={key}
                                    >
                                        {name}
                                    </button>
                                ))
                        ) : (
                            <span className='text-start px-2 py-2 text-sm'>No job sources found yet!</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(SyncNow)
