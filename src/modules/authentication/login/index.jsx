import { memo, useState } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '@components'

import { loginUser } from '@modules/authentication/api'
import { AuthLayout, RememberMe, TermsOfService } from '@modules/authentication/components'

import { loginSchema } from '@utils/schemas'

import { ValidateTrueIcon, ValidateFalseIcon, SeePassIcon, HidePassIcon } from '@icons'

const Login = memo(() => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async ({ email, password }) => {
            setDisabled(true)
            const { status, message } = await loginUser(email, password)
            if (status === 'error') {
                toast.error(message)
                setDisabled(false)
            } else {
                toast.success(message)
                setTimeout(() => {
                    // navigate('/') // For time being, this is not working.
                    window.location.reload()
                }, 2000)
            }
        },
    })
    const togglePassword = () => setShowPassword(!showPassword)
    const handleClick = () => navigate('/forget-password')

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
                <div className='flex justify-between'>
                    <RememberMe />
                    <a className='text-sm text-[#048C8C] hover:underline cursor-pointer' onClick={handleClick}>
                        Forgot password?
                    </a>
                </div>
                <Button label={disabled ? 'SIGNING IN....' : 'SIGN IN'} type='submit' disabled={disabled} />
                <TermsOfService />
            </form>
        </AuthLayout>
    )
})

export default Login
