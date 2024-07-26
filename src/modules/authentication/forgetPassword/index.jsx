import { memo } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '@components'

import { sendResetPasswordLink } from '@modules/authentication/api'
import { AuthLayout } from '@modules/authentication/components'

import { forgotPasswordSchema } from '@utils/schemas'

import { ValidateTrueIcon, ValidateFalseIcon } from '@icons'

const ForgetPassword = memo(() => {
    const navigate = useNavigate()
    const { values, errors, handleBlur, handleSubmit, handleChange, isSubmitting } = useFormik({
        initialValues: { email: '' },
        validationSchema: forgotPasswordSchema,
        onSubmit: async ({ email, setSubmitting }) => {
            const { status, message } = await sendResetPasswordLink(email)
            if (status === 'error') toast.error(message || 'Something gone wrong')
            else {
                toast.success(message)
                setTimeout(() => navigate('/login'), 3000)
            }
            setSubmitting(false)
        },
    })
    const handleClick = () => navigate('/login')

    return (
        <AuthLayout>
            <form className='space-y-2 md:space-y-4' onSubmit={handleSubmit}>
                <div className='relative'>
                    <Input
                        name='email'
                        type='email'
                        onChange={handleChange}
                        value={values.email}
                        ph='Email'
                        onBlur={handleBlur}
                        label='Email'
                    />
                    <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2 pointer-events-none'>
                        {errors.email ? ValidateFalseIcon : values.email.length > 0 && ValidateTrueIcon}
                    </div>
                </div>
                {errors.email && <small className='ml-2 text-sm text-red-400'>{errors.email}</small>}
                <Button
                    label={isSubmitting ? 'Sending ...' : 'Send Reset Password Link'}
                    type='submit'
                    disabled={isSubmitting}
                />
                <Button label='Back to login' onClick={handleClick} disabled={isSubmitting} />
            </form>
        </AuthLayout>
    )
})

export default ForgetPassword
