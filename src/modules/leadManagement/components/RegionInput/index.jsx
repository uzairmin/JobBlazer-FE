import { useEffect, useState } from 'react'

import { Button, Input, Badge, CustomSelector } from '@components'

import { parseRegions, findRegion } from '@/utils/helpers'
import { AddSkillIcon } from '@icons'

const RegionInput = ({ value, error = null, set, regions }) => {
    const [tags, setTags] = useState(value ? parseRegions(value) : [])
    const [inputValue, setInputValue] = useState({ label: '', value: '' })
    const [errors, setErrors] = useState('')

    const handleClick = () => {
        if (inputValue.label.length > 0) {
            if (findRegion(inputValue.label, regions)) {
                setErrors('region name already exists')
                setTags(tags.filter(tag => tag !== inputValue))
            } else {
                setTags([...tags, inputValue])
                setInputValue({ label: '', value: '' })
            }
        } else {
            setErrors('region name is required')
        }
    }
    const handleChange = e => {
        setErrors('')
        setInputValue({ label: e.target.value, value: '' })
    }
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useEffect(() => {
        set('regions', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Regions</span>
            <div className='flex  gap-3'>
                <div className='w-[50%]'>
                    <CustomSelector
                        options={parseRegions(regions)}
                        handleChange={obj => setTags(obj)}
                        selectorValue={tags}
                        isMulti
                        placeholder='select regions'
                    />
                </div>
                <div>
                    <Input value={inputValue.label} onChange={handleChange} ph='Add a Region...' />
                    {errors.length > 0 && <small className='__error'>{errors}</small>}
                </div>
                <div>
                    <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !p-3 ' />
                </div>
            </div>
            <div className='flex flex-wrap gap-3 items-center mt-2'>
                {tags?.length > 0 &&
                    tags?.map(tag => (
                        <Badge
                            label={
                                <span className='inline-block items-center'>
                                    <span>{tag.label}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleTagRemove(tag)}
                                        className='ml-2 italic focus:outline-none hover:text-red-700'
                                    >
                                        X
                                    </button>
                                </span>
                            }
                            type='success'
                            classes='border border-green-300'
                            key={tag.value}
                        />
                    ))}
            </div>
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default RegionInput
