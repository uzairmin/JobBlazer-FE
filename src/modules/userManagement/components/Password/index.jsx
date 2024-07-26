import { memo, useState } from 'react'

import { Input } from '@components'

import { SeePassIcon, HidePassIcon } from '@icons'

const Password = ({ id, value, error, onChange = null }) => {
    const [hide, setHide] = useState(true)

    return id ? null : (
        <>
            <span className='text-xs font-semibold'>Password*</span>
            <div className='relative'>
                <Input
                    name='password'
                    type={hide ? 'password' : 'hide'}
                    value={value}
                    onChange={onChange}
                    ph='Password'
                />
                <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2'>
                    <span className='mr-1 cursor-pointer' onClick={() => setHide(!hide)}>
                        {hide ? HidePassIcon : SeePassIcon}
                    </span>
                </div>
            </div>
            {error && <small className='ml-1 text-xs text-red-600'>{error}</small>}
        </>
    )
}

export default memo(Password)
