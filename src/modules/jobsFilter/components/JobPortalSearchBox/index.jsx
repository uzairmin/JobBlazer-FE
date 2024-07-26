import { memo } from 'react'

import { Input } from '@components'
import { SearchIcon } from '@/assets/icons'

const JobPortalSearchBox = ({ value, setQuery, handleEnter }) => {
    const handleChange = e => {
        setQuery(e.target.value)
    }

    return (
        <div className='relative hidden md:block flex-1 bg-white mr-4'>
            <Input ph='Search by typing keywords...' value={value} onChange={handleChange} onKeyDown={handleEnter} />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-xl'>{SearchIcon}</div>
        </div>
    )
}

export default memo(JobPortalSearchBox)
