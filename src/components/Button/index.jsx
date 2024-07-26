import React, { memo } from 'react'

const Button = memo(
    ({
        label,
        type = 'button',
        onClick = null,
        disabled = false,
        fit = false,
        icon = null,
        svg = null,
        fill = false,
        classes = null,
    }) => (
        <button
            type={type}
            className={`w-${fit ? 'fit' : 'full'} ${
                fill ? 'text-white bg-[#048C8C] hover:bg-[#10a5a5]' : 'text-[#048C8C]'
            } border border-cyan-600 font-medium rounded-lg text-sm px-2 py-2 text-center ${
                label && 'hover:text-white hover:bg-[#048C8C]'
            } ${(icon || svg) && 'flex items-center justify-center'} ${classes}`}
            onClick={onClick}
            disabled={disabled}
        >
            {svg && <img src={svg} alt={label} className='w-6 h-6' />}
            {icon && <span className='mx-1'>{icon}</span>}
            {label}
        </button>
    )
)

export default Button
