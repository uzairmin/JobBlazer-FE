/* eslint-disable jsx-a11y/no-autofocus */
import { memo } from 'react'

const Input = memo(
    ({
        name,
        type = 'text',
        onChange = null,
        onBlur = null,
        value = undefined,
        accepts = null,
        ph = '',
        onKeyDown = null,
        classes = null,
        label = null,
        max = null,
        min = null,
        readonly = false,
    }) => (
        <div className={label && `relative`}>
            <input
                type={type}
                name={name}
                className={`block px-4 pb-2.5 ${
                    label ? 'pt-4' : 'pt-2.5'
                } w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer ${classes}`}
                placeholder={ph}
                required=''
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                max={max}
                min={min}
                autoFocus
                accept={accepts}
                readOnly={readonly}
            />
            {label && (
                <label className='absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#048C8C] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3'>
                    {label}
                </label>
            )}
        </div>
    )
)

export default Input
