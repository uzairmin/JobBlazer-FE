import { memo } from 'react'
import { toast } from 'react-hot-toast'

import { Input, Button } from '@components'

import { updateProfile } from '@modules/profile/api'

import { useMutate } from '@/hooks'

import { profileSchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

const UpdateDetails = ({ data }) => {
    const { values, errors, handleSubmit, handleChange, trigger } = useMutate(
        '/api/auth/user_profile/',
        updateProfile,
        {
            first_name: data?.profile?.first_name || '',
            last_name: data?.profile?.last_name || '',
            username: data?.profile?.username || '',
            email: data?.profile?.email || '',
        },
        profileSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error))
    )

    return (
        <form onSubmit={handleSubmit} className='text-[#328d8c]'>
            <h1 className='mb-2 text-lg font-medium'>Details</h1>
            <hr className='mb-5' />
            <div className='grid grid-flow-row gap-2'>
                <span className='text-xs font-semibold'>Email*</span>
                <Input name='email' type='email' value={values.email} onChange={handleChange} ph='Enter email' />
                {errors.email && <small className='ml-1 text-xs text-red-600'>{errors.email}</small>}
                <span className='text-xs font-semibold'>Username*</span>
                <Input name='username' value={values.username} onChange={handleChange} ph='Enter username' />
                {errors.username && <small className='ml-1 text-xs text-red-600'>{errors.username}</small>}
                <span className='text-xs font-semibold'>First Name*</span>
                <Input name='first_name' value={values.first_name} onChange={handleChange} ph='Enter first name' />
                {errors.first_name && <small className='ml-1 text-xs text-red-600'>{errors.first_name}</small>}
                <span className='text-xs font-semibold'>Last Name*</span>
                <Input name='last_name' value={values.last_name} onChange={handleChange} ph='Enter last name' />
                {errors.last_name && <small className='ml-1 text-xs text-red-600'>{errors.last_name}</small>}
                <div className='pt-4 text-end'>
                    <Button label='Update' type='submit' fit classes='px-6' />
                </div>
            </div>
        </form>
    )
}

export default memo(UpdateDetails)
