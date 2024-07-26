import { memo } from 'react'
import { Input } from '@components'

import { SeePassIcon, HidePassIcon } from '@icons'

const PasswordType = ({ name, label, ph, value, error, show, setShow, onChange = null, type }) => (
    <>
        <span className='text-xs font-semibold'>{label} Password*</span>
        <div className='relative'>
            <Input name={name} type={show[type] ? 'text' : 'password'} value={value} onChange={onChange} ph={ph} />
            <div className='absolute inset-y-0 right-1 flex items-center pl-3 p-2'>
                <span className='mr-1 cursor-pointer' onClick={() => setShow({ ...show, [type]: !show[type] })}>
                    {show[type] ? HidePassIcon : SeePassIcon}
                </span>
            </div>
        </div>
        {error && <small className='ml-1 text-xs text-red-600'>{error}</small>}
    </>
)

export default memo(PasswordType)
