import { memo, useState } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button, Input } from '@components'

import { resetPassword } from '@modules/authentication/api'
import { AuthLayout } from '@modules/authentication/components'

import { resetPasswordSchema } from '@utils/schemas'

import { ValidateTrueIcon, ValidateFalseIcon, SeePassIcon, HidePassIcon } from '@icons'

const ForgetPassword = memo(() => {
    const navigate = useNavigate()
    const { search } = useLocation()
    const email = new URLSearchParams(search).get('email')
    const code = new URLSearchParams(search).get('code')
    const [showPassword, setShowPassword] = useState(false)

    const { values, errors, handleBlur, handleSubmit, handleChange, isSubmitting } = useFormik({
        initialValues: { password: '', passwordConfirmation: '' },
        validationSchema: resetPasswordSchema,
        onSubmit: async ({ password, passwordConfirmation, setSubmitting }) => {
            const { status, message } = await resetPassword(password, passwordConfirmation, email, code)
            if (status === 'error') toast.error(message)
            else {
                toast.success(message)
                setTimeout(() => navigate('/login'), 3000)
            }
            setSubmitting(false)
        },
    })
    const handleClick = () => navigate('/login')
    const togglePassword = () => setShowPassword(!showPassword)

    return (
        <AuthLayout>
            <form className='space-y-2 md:space-y-4' onSubmit={handleSubmit}>
                <div className='relative'>
                    <Input
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        value={values.password}
                        ph='Password'
                        onBlur={handleBlur}
                        label='Password'
                    />
                    <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2'>
                        <span className='mr-1 cursor-pointer' onClick={togglePassword}>
                            {showPassword ? HidePassIcon : SeePassIcon}
                        </span>
                        {errors.password ? ValidateFalseIcon : values.password.length > 0 && ValidateTrueIcon}
                    </div>
                </div>
                {errors.password && <small className='ml-2 text-sm text-red-400'>{errors.password}</small>}
                <div className='relative'>
                    <Input
                        name='passwordConfirmation'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        value={values.passwordConfirmation}
                        ph='Confirm Password'
                        onBlur={handleBlur}
                        label='Confirm Password'
                    />
                    <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2'>
                        {errors.passwordConfirmation
                            ? ValidateFalseIcon
                            : values.passwordConfirmation.length > 0 && ValidateTrueIcon}
                    </div>
                </div>
                {errors.passwordConfirmation && (
                    <small className='ml-2 text-sm text-red-400'>{errors.passwordConfirmation}</small>
                )}
                <Button label={isSubmitting ? 'Reseting' : 'Reset Password'} type='submit' disabled={isSubmitting} />
                <Button
                    label={isSubmitting ? 'Wait for response' : 'Back to login'}
                    onClick={handleClick}
                    disabled={isSubmitting}
                />
            </form>
        </AuthLayout>
    )
})

export default ForgetPassword
