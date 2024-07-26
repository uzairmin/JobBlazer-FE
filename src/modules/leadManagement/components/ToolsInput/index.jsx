import { useEffect, useState } from 'react'

import { Button, Input, Badge } from '@components'

import { AddSkillIcon } from '@icons'

const ToolsInput = ({ value, error = null, set }) => {
    const [tags, setTags] = useState(value)
    const [inputValue, setInputValue] = useState({ tool: '', description: '' })
    const [errors, setErrors] = useState('')

    const handleTool = e => {
        setErrors('')
        setInputValue({ ...inputValue, tool: e.target.value })
    }

    const handleDes = e => setInputValue({ ...inputValue, description: e.target.value })

    const handleClick = () => {
        if (inputValue.tool.length > 0) {
            setErrors('')
            setTags([...tags, inputValue])
            setInputValue({ tool: '', description: '' })
        } else {
            setErrors('tool name is required')
        }
    }

    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))
    useEffect(() => {
        set('tools', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Tools</span>
            <div className='flex flex-wrap gap-3 items-center'>
                <div className='flex flex-row gap-3'>
                    <div>
                        <Input value={inputValue.tool} onChange={handleTool} ph='Add a Tool...' />
                        {errors.length > 0 && <small className='__error'>{errors}</small>}
                    </div>
                    <Input value={inputValue.description} onChange={handleDes} ph='Add desription...' />
                </div>
                <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
                {tags?.length > 0 &&
                    tags.map(tag => (
                        <Badge
                            label={
                                <span className='inline-block items-center'>
                                    <span>{tag.tool}</span>
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
                            key={tag}
                        />
                    ))}
            </div>
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default ToolsInput
