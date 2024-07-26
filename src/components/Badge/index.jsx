import { memo } from 'react'

const Badge = ({ label, type = 'default', classes = null }) => {
    let typeClass
    switch (type) {
        case 'success':
            typeClass = 'bg-green-100 text-green-800'
            break
        case 'enabled':
            typeClass = 'bg-[#048C8C] text-white'
            break
        case 'disabled':
            typeClass = 'bg-[#FF6280] text-white'
            break
        default:
            typeClass = 'bg-blue-100 text-blue-800'
    }
    return (
        <span className={`${typeClass} inline-block text-center text-sm font-medium px-2 py-1 rounded-full ${classes}`}>
            {label || '-'}
        </span>
    )
}

export default memo(Badge)
