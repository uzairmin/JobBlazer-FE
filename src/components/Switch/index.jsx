import React, { memo } from 'react'

const Switch = memo(({ label = null, name, onCheck = null }) => (
    <label htmlFor='Toggle2' className='inline-flex items-center space-x-4 cursor-pointer text-[#048C8C]'>
        <span className='relative'>
            <input id='Toggle2' type='checkbox' name={name} className='hidden peer' onChange={onCheck} />
            <div className='w-10 h-4 rounded-full shadow bg-[#048C8C] peer-checked:bg-[#048C8C]' />
            <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-white' />
        </span>
        {label ? <span className='text-sm'>{label}</span> : null}
    </label>
))

export default Switch
