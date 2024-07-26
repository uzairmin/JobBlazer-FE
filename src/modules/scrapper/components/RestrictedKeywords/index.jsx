import { memo } from 'react'
import useSWR from 'swr'

import { useResctrictedKeywordsStore } from '@/stores'

import { Loading, Button } from '@components'

import { RestrictedKeywordForm, RestrictedKeywordActions } from '@modules/scrapper/components'
import { fetchRestrictedKeywords } from '@modules/scrapper/api'

import { can } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

import { CreateIcon } from '@icons'

const RestrictedKeywords = () => {
    const [show, setKeyword] = useResctrictedKeywordsStore(state => [state?.show, state?.setKeyword])

    const { data, error, isLoading, mutate } = useSWR(
        `/api/job_scraper/restricted_keywords/`,
        fetchRestrictedKeywords,
        SWR_REVALIDATE
    )

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto px-2 hide_scrollbar'>
            <div className='flex justify-end pb-2'>
                {can('create_job_source') && (
                    <Button label='Add Restricted Keyword' fit icon={CreateIcon} onClick={() => setKeyword(null)} />
                )}
            </div>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div
                            className='bg-white border border-[#048C8C] border-opacity-60 rounded-md p-4 relative hover:bg-slate-100'
                            key={idx}
                        >
                            <h3 className='italic'>{row?.tag ?? 'N/A'}</h3>
                            {can(['edit_job_source', 'delete_job_source']) && (
                                <RestrictedKeywordActions edit={() => setKeyword(row)} id={row?.id} refetch={mutate} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='text-center p-5 text-gray-500'>No Restricted Keywords found yet!</span>
                )}
            </div>
            {can('create_job_source') && show && <RestrictedKeywordForm refetch={mutate} />}
        </div>
    )
}

export default memo(RestrictedKeywords)
