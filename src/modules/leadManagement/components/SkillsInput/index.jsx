import { useEffect, useState } from 'react'

import { Button, Input, Badge, SliderInput } from '@components'

import { findSkill } from '@/utils/helpers'
import { AddSkillIcon } from '@icons'

const SkillsInput = ({ value, error = null, set }) => {
    const [tags, setTags] = useState(value)
    const [inputValue, setInputValue] = useState({ name: '', level: 0 })
    const [errors, setErrors] = useState('')

    const handleSkill = e => {
        setErrors('')
        setInputValue({ ...inputValue, name: e.target.value })
    }

    const handelLevel = ({ target: { value: level } }) => setInputValue({ ...inputValue, level })

    const handleClick = () => {
        if (inputValue.name.length > 0) {
            if (findSkill(inputValue.name, tags)) {
                setErrors('skill already added to the list')
            } else {
                setTags([...tags, inputValue])
                setInputValue({ name: '', level: 0 })
                setErrors('')
            }
        } else {
            setErrors('skill name is required')
        }
    }
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useEffect(() => {
        set('skills', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Skills</span>
            <div className='flex flex-col-2 gap-3 items-center'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-2'>
                        <Input value={inputValue.name} onChange={handleSkill} ph='Add a skill...' />
                        <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
                    </div>
                    {errors.length > 0 && <small className='__error'>{errors}</small>}
                    <SliderInput value={inputValue.level} onChange={handelLevel} name='level' max={5} min={0} />
                </div>
                <div className='flex flex-wrap gap-3 items-center'>
                    {tags?.length > 0 &&
                        tags.map(tag => (
                            <Badge
                                label={
                                    <span className='inline-block items-center'>
                                        <span>{tag.name}</span>
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
                                key={tag.name}
                            />
                        ))}
                </div>
                {error && <small className='__error'>{errors}</small>}
            </div>
        </div>
    )
}

export default SkillsInput
