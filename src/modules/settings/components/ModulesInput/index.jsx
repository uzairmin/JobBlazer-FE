import { useEffect, useState } from 'react'

import { Input, CustomSelector } from '@components'

import { parseModules, parseModule } from '@utils/helpers'

const ModuleInput = ({ modules, selectedModule, handleFieldChange, index }) => {
    const [inputValue, setInputValue] = useState(selectedModule || '')

    const handleClick = (value, key) => {
        setInputValue(value.label)
        handleFieldChange(index, inputValue, key)
    }
    const handleChange = e => setInputValue(e.target.value)

    useEffect(() => {
        if (inputValue?.length > 0) {
            handleFieldChange(index, inputValue, 'module')
        }
    }, [inputValue])

    return (
        <div className='flex gap-2 items-center'>
            <div className='w-[350px]'>
                <CustomSelector
                    options={parseModules(modules)}
                    selectorValue={parseModule(inputValue)}
                    handleChange={module => handleClick(module, 'module')}
                    placeholder='Select Module'
                />
            </div>
            <div>
                <Input value={inputValue} onChange={handleChange} label='module' />
            </div>
        </div>
    )
}

export default ModuleInput
