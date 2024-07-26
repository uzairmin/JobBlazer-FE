import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@components'

import { updatePassword } from '@modules/profile/api'
import { PasswordType } from '@modules/profile/components'

import { useMutate } from '@/hooks'

import { updatePasswordSchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

const UpdatePassword = () => {
    const [show, setShow] = useState({ old: false, new: false, confirm: false })

    const { values, errors, handleSubmit, handleChange, trigger, resetForm } = useMutate(
        '/api/auth/password/change/',
        updatePassword,
        { old_password: '', new_password: '', confirmed_password: '' },
        updatePasswordSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error)),
        () => resetForm()
    )

    return (
        <form onSubmit={handleSubmit} className='text-[#328d8c]'>
            <h1 className='mb-2 text-lg font-medium'>Update Password</h1>
            <hr className='mb-5' />
            <div className='grid grid-flow-row gap-2'>
                <PasswordType
                    label='Old'
                    name='old_password'
                    ph='Enter old password'
                    value={values.old_password}
                    error={errors.old_password}
                    onChange={handleChange}
                    show={show}
                    setShow={setShow}
                    type='old'
                />
                <PasswordType
                    label='New'
                    name='new_password'
                    ph='Enter new password'
                    value={values.new_password}
                    error={errors.new_password}
                    onChange={handleChange}
                    show={show}
                    setShow={setShow}
                    type='new'
                />
                <PasswordType
                    label=''
                    name='confirmed_password'
                    ph='Re-enter password'
                    value={values.confirmed_password}
                    error={errors.confirmed_password}
                    onChange={handleChange}
                    show={show}
                    setShow={setShow}
                    type='confirm'
                />
                <div className='pt-4 text-end'>
                    <Button label='Change' type='submit' fit classes='px-6' />
                </div>
            </div>
        </form>
    )
}
export default memo(UpdatePassword)
