import { memo } from 'react'
import useSWR from 'swr'

import { useGroupLinksStore } from '@/stores'

import { Button, Loading } from '@components'

import {
    GroupLinkActions,
    GroupLinksCreateForm,
    RunningGroupLink,
    GroupLinksDetails,
    GroupLinksSummary,
} from '@modules/scrapper/components'
import { fetchGroupLinks } from '@modules/scrapper/api'

import { can, formatStringInPascal, isset } from '@utils/helpers'

import { CreateIcon, ResetIcon } from '@icons'

const GroupLinks = () => {
    const [link, setLink, showDetails, showForm, toggleForm] = useGroupLinksStore(state => [
        state?.link,
        state?.setLink,
        state?.show?.details,
        state?.show?.form,
        state?.toggle?.form,
    ])

    const { data, isLoading, error, mutate } = useSWR('/api/job_scraper/group_scheduler_link/', fetchGroupLinks)

    const handleClick = (values = null) => setLink(values)

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <div className='flex items-center space-x-4 pb-4 justify-between'>
                {can('create_job_source_link') && (
                    <Button label='Create Group Links' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
                <Button label='Refresh' fit icon={ResetIcon} onClick={() => mutate()} />
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {isset(data?.grouplinks) && !error ? (
                    Object.keys(data?.grouplinks).map((row, idx) => (
                        <div className='bg-white rounded-md p-4 border relative text-[#338d8c]' key={idx}>
                            <h2 className='text-2xl'>{formatStringInPascal(row)}</h2>
                            {false && <GroupLinkActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />}
                            <div className='flex flex-col mt-2 ml-2 text-sm'>
                                <GroupLinksSummary summary={data?.grouplinks?.[row]} name={row} />
                                <RunningGroupLink link={data?.grouplinks?.[row]?.running_query?.[0]} />
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No group links / urls found yet!</span>
                )}
            </div>
            {showDetails && <GroupLinksDetails />}
            {can('edit_job_source_link') && showForm && (
                <GroupLinksCreateForm show={showForm} setShow={toggleForm} mutate={mutate} link={link} />
            )}
        </div>
    )
}

export default memo(GroupLinks)
