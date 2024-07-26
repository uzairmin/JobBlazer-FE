import React, { memo } from 'react'

const Radio = ({ checked = false, onChange = null, value, name, label }) => (
    <div className='flex items-center'>
        <input
            className='w-4 h-4 checked:w-3 checked:h-3 bg-gray-300 appearance-none checked:opacity-100 checked:ring-2 checked:ring-offset-2 checked:ring-[#328d8c] checked:outline-none border rounded-full checked:bg-[#328d8c]'
            type='radio'
            name={name}
            defaultChecked={checked}
            value={value}
            onChange={onChange}
        />
        <label className='checked:text-[#328d8c] ml-3 font-normal'>{label}</label>
    </div>
)

export default memo(Radio)
