import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, Modal, Tooltip, Input, CustomSelector } from '@components'

import { ModuleInput } from '@modules/settings/components'
import { savePermission } from '@modules/settings/api'

import { parsePermissions, parseModules } from '@utils/helpers'

import { ValidateFalseIcon } from '@icons'

const PermissionForm = ({ show, setShow, mutate, permission, modules, permissionModule }) => {
    const [fields, setFields] = useState(
        permission?.id ? [permission] : [{ module: '', codename: '', name: '', level: '', id: '' }]
    )

    const handleFieldChange = (index, value, key) => {
        const newFields = [...fields]
        if (key === 'child' || key === 'parent') {
            value = value.map(val => val.value)
        }
        newFields[index][key] = value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, { module: '', codename: '', name: '', level: '', id: '' }])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { handleSubmit, resetForm, trigger } = useMutate(
        `/api/auth/permission${permission?.id ? `/${permission?.id}/` : '/'}`,
        savePermission,
        {},
        null,
        async () => trigger({ permissions: fields }),
        null,
        () => {
            mutate()
            if (!permission?.id) {
                resetForm()
                setShow(false)
                setFields([])
            }
        }
    )

    return (
        <Modal
            classes='!w-1/2'
            show={show}
            setShow={setShow}
            content={
                <form onSubmit={handleSubmit} className='w-full hide_scrollbar overflow-x-auto'>
                    <div className='grid grid-flow-row gap-2'>
                        <p className='text-xl text-[#048C8C] font-semibold'>
                            {permission?.id ? 'Edit' : 'Create'} Permissions
                        </p>
                        <hr className='mb-1 w-full' />
                        <div className='flex justify-between items-center'>
                            {permission?.id ? null : (
                                <span className='text-sm text-[#048C8C]'>Multiple Permission</span>
                            )}
                            {fields.length < 5 && !permission?.id && (
                                <Tooltip text='Add Link'>
                                    <Button onClick={addField} icon='+ Add' fit classes='!px-1 !py-0.5' />
                                </Tooltip>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            {fields?.map((field, index) => (
                                <div
                                    key={index}
                                    className={`grid ${
                                        permission?.id ? 'grid-cols-1' : 'grid-cols-2'
                                    } gap-2 items-center w-full`}
                                >
                                    <ModuleInput
                                        modules={modules}
                                        index={index}
                                        handleFieldChange={handleFieldChange}
                                        selectedModule={permissionModule?.module}
                                    />
                                    <div className='grid grid-cols-3 gap-2 items-center'>
                                        <div className='flex-grow'>
                                            <Input
                                                value={field?.codename}
                                                onChange={e => handleFieldChange(index, e.target.value, 'codename')}
                                                label='codename'
                                            />
                                        </div>
                                        <div className='flex-grow'>
                                            <Input
                                                value={field?.name}
                                                onChange={e => handleFieldChange(index, e.target.value, 'name')}
                                                label='name'
                                            />
                                        </div>
                                        <div className='flex-grow'>
                                            <Input
                                                value={field?.level}
                                                onChange={e => handleFieldChange(index, e.target.value, 'level')}
                                                label='levels'
                                            />
                                        </div>
                                    </div>
                                    {permission?.id && (
                                        <div className='mt-6'>
                                            <span className='text-md text-[#048C8C] font-semibold'>
                                                Assign Parents and Children
                                            </span>
                                            <div className='flex gap-4'>
                                                <CustomSelector
                                                    options={parsePermissions(permissionModule?.permissions)}
                                                    selectorValue={parseModules(field?.child)}
                                                    handleChange={e => handleFieldChange(index, e, 'child')}
                                                    isMulti
                                                    placeholder='Select Children'
                                                />
                                                <CustomSelector
                                                    options={parsePermissions(permissionModule?.permissions)}
                                                    selectorValue={parseModules(field?.parent)}
                                                    handleChange={e => handleFieldChange(index, e, 'parent')}
                                                    isMulti
                                                    placeholder='Select Parents'
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {!permission?.id && (
                                        <Tooltip text='Re-move Link'>
                                            <Button
                                                classes='border-0 !text-lg !w-6 !h-6 flex justify-end'
                                                icon={ValidateFalseIcon}
                                                onClick={() => removeField(index)}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='pt-4 space-x-4 text-right'>
                        {fields.length > 0 && (
                            <Button label={permission?.id ? 'Update' : 'Submit'} type='submit' fill fit />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} fit />
                    </div>
                </form>
            }
        />
    )
}

export default memo(PermissionForm)
