import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input } from '@components'

import { Permissions } from '@modules/userManagement/components'
import { saveRole } from '@modules/userManagement/api'

import { roleSchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

const RoleForm = ({ show, setShow, mutate, role }) => {
    const [permissions, setPermissions] = useState(role?.permissions?.map(p => p.codename) ?? [])
    const { values, errors, handleSubmit, handleChange, resetForm, trigger } = useMutate(
        `/api/auth/role${role?.id ? `/${role?.id}/` : '/'}`,
        saveRole,
        role,
        roleSchema,
        async formValues => trigger({ ...formValues, id: role?.id, permissions }),
        error => toast.error(getMsg(error)),
        () => {
            mutate()
            if (!role?.id) resetForm()
            setShow(false)
        }
    )

    // const { wait, confirm } = useDelete(`/api/auth/role/${role?.id}/`)

    return (
        <Drawer show={show} setShow={setShow} w='700px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='sticky top-0 z-10 bg-white'>
                    <div className='flex flex-wrap items-center justify-between'>
                        <span>{role?.id ? 'Edit' : 'Create'} Role</span>
                        <div className='grid grid-cols-2 gap-3'>
                            <Button label={role?.id ? 'Update' : 'Submit'} type='submit' fill classes='md:!px-6' />
                            <Button label='Cancel' onClick={() => setShow(false)} />
                        </div>
                    </div>
                    <hr className='h-px mt-3 mb-4 bg-gray-50 border-0 dark:bg-gray-300' />
                </div>

                <div className='grid grid-flow-row gap-2 overflow-y-auto'>
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <Permissions permissions={permissions} setPermissions={setPermissions} />
                </div>
            </form>
        </Drawer>
    )
}

export default memo(RoleForm)
