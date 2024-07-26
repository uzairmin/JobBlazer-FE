import { memo } from 'react'

import { Input } from '@components'

import { useJobPortalV2Store } from '@/stores'

import { SearchIcon } from '@icons'

const Search = () => {
    const [query, setQuery, apply] = useJobPortalV2Store(state => [state?.query, state?.setQuery, state?.applyFilters])

    return (
        <div className='relative bg-white w-full'>
            <Input
                ph='Search by typing keywords...'
                value={query}
                onChange={e => setQuery(e?.target?.value)}
                onKeyDown={e => (e.key === 'Enter' ? apply() : null)}
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 text-xl'>{SearchIcon}</div>
        </div>
    )
}

export default memo(Search)
