import { useEffect, useState } from 'react'

import { Button, Input } from '@components'

import { VERTICAL_HOBBY_DELETION } from '@constants/allowDeletion'

import { CreateIcon } from '@icons'

const Hobbies = ({ hobbies, setHobbies }) => {
    const [tags, setTags] = useState(hobbies)
    const [inputValue, setInputValue] = useState('')

    const handleChange = e => setInputValue(e.target.value)

    const handleClick = () => {
        if (inputValue) {
            setTags([...tags, inputValue])
            setInputValue('')
        }
    }

    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useEffect(() => setHobbies(tags), [tags])

    return (
        <div className='pb-5'>
            <span className='text-xs font-semibold'>Hobbies</span>
            <div className='flex flex-wrap gap-3 items-center'>
                <Input value={inputValue} onChange={handleChange} ph='Add a hobby...' />
                <Button icon={CreateIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
                {tags?.length > 0 &&
                    tags.map(tag => (
                        <span
                            key={tag}
                            className='inline-block px-2.5 py-1.5 text-sm font-semibold bg-gray-200 rounded-full items-center'
                        >
                            <span>{tag}</span>
                            {VERTICAL_HOBBY_DELETION && (
                                <button
                                    type='button'
                                    onClick={() => handleTagRemove(tag)}
                                    className='ml-2 text-gray-700 font-semibold focus:outline-none hover:text-red-700'
                                >
                                    x
                                </button>
                            )}
                        </span>
                    ))}
            </div>
        </div>
    )
}

export default Hobbies
