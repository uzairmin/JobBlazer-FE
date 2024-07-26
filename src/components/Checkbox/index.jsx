import { memo } from 'react'

const Checkbox = ({ name, label, checked = true, onChange }) => (
    <label className='relative inline-flex items-center cursor-pointer'>
        <input name={name} type='checkbox' className='sr-only peer' defaultChecked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#048C8C]" />
        <span className='ml-3 text-sm font-medium text-[#048C8C]'>{label}</span>
    </label>
)

export default memo(Checkbox)
