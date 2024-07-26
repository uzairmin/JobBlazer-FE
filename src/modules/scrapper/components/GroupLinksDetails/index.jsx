import { memo } from 'react'
import useSWR from 'swr'

import { useGroupLinksStore } from '@/stores'

import { Drawer, Button, Tooltip } from '@components'

import { GroupLinkRow, RunningGroupLink } from '@modules/scrapper/components'
import { fetchGroupLinksDetails } from '@modules/scrapper/api'

import { formatStringInPascal } from '@utils/helpers'

import { ResetFilterIcon } from '@icons'

const GroupLinksDetails = () => {
    const [name, ID, status, show, tabs, setShow, switchTab] = useGroupLinksStore(state => [
        state?.link?.name,
        state?.link?.id,
        state?.status,
        state?.show?.details,
        state?.tabs,
        state?.toggle?.details,
        state?.switchTab,
    ])

    const { data, isLoading, error, mutate } = useSWR(
        `/api/job_scraper/status_wise_queries/?group_scraper_id=${ID}&status=${status}`,
        fetchGroupLinksDetails
    )

    return (
        <Drawer show={show} setShow={setShow} w='50%'>
            <div className='flex flex-col mb-4'>
                <span className='text-3xl uppercase mx-auto pb-3'>{name ?? 'No Name'}</span>
                <div className='flex flex-col mb-2 space-y-2 md:gap-5 sm:flex-row sm:space-y-0'>
                    {Object.keys(tabs)?.map((tab, idx) => (
                        <Button
                            key={idx}
                            label={formatStringInPascal(tab)}
                            fill={tabs[tab]}
                            classes={`rounded-none ${!tabs[tab] && 'border-cyan-200'}`}
                            onClick={() => switchTab(tab)}
                        />
                    ))}
                </div>
                {Object.keys(tabs)
                    ?.filter(tab => tab !== 'running')
                    ?.map(
                        (tab, idx) =>
                            tabs[tab] && (
                                <div className='p-3' key={idx}>
                                    <span className='font-semibold'>{formatStringInPascal(tab)} Group Links</span>
                                    {isLoading ? (
                                        <span className='mx-auto block'>Loading..</span>
                                    ) : (
                                        <div className='flex flex-col gap-2'>
                                            {data?.queries?.length > 0 && !error ? (
                                                data?.queries?.map((row, index) => (
                                                    <GroupLinkRow
                                                        row={row}
                                                        key={index}
                                                        actions={tab === 'total'}
                                                        status={tab === 'total'}
                                                        mutate={mutate}
                                                    />
                                                ))
                                            ) : (
                                                <span>No links found</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                    )}
                {tabs.running && (
                    <div className='flex flex-col p-3'>
                        <div className='flex items-center justify-between'>
                            <span className='font-semibold'>Current Group Scraper Link</span>
                            <span className='cursor-pointer pr-3' onClick={() => mutate()}>
                                <Tooltip text='Refetch running scraper'>{ResetFilterIcon}</Tooltip>
                            </span>
                        </div>
                        {isLoading ? (
                            <span className='mx-auto block'>Loading..</span>
                        ) : (
                            <RunningGroupLink link={data?.queries?.[0]} />
                        )}
                    </div>
                )}
            </div>
        </Drawer>
    )
}

export default memo(GroupLinksDetails)
