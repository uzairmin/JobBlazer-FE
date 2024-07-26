import { memo, useState } from 'react'

import { Input, Filters } from '@components'

import { NavbarSearchIcon } from '@icons'

const Searchbox = ({ name = 'search', ph = 'Search', query, setQuery, clear = null, apply = null, reset = null }) => {
    const [value, setValue] = useState(query)
    const handleChange = e => setValue(e.target.value)
    const handleClick = () => {
        setQuery(value)
        if (reset) reset(1)
    }
    const handleEnter = e => {
        if (e.key === 'Enter') {
            setQuery(value)
            if (reset) reset(1)
        }
    }

    const handleClear = () => {
        setQuery('')
        setValue('')
        if (reset) reset(1)
    }

    const customClear = clear
        ? () => {
              clear()
              setValue('')
          }
        : null

    return (
        <>
            <div className='relative'>
                <div
                    className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'
                    onClick={handleClick}
                >
                    {NavbarSearchIcon}
                </div>
                <Input name={name} ph={ph} value={value} onChange={handleChange} onKeyDown={handleEnter} />
            </div>
            <Filters clear={customClear ?? handleClear} apply={apply} />
        </>
    )
}

export default memo(Searchbox)
