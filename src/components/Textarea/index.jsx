import { memo } from 'react'

const Textarea = memo(
    ({ name = null, onChange = null, value, ph = '', classes = null, rows = 4, required = false }) => (
        <textarea
            className={`w-full text-sm border border-cyan-600 outline-none p-2 rounded-lg text-gray-500 ${classes}`}
            name={name}
            onChange={onChange}
            placeholder={ph}
            value={value}
            rows={rows}
            required={required}
        />
    )
)

export default Textarea
