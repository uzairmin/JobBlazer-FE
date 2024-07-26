import { memo } from 'react'

const PortalLayout = ({ loading = false, error = null, module = null, children }) =>
    loading ? (
        <span className='flex items-center justify-center h-[80%] animate-pulse text-xl text-[#338d8c] capitalize'>
            Loading {module}....
        </span>
    ) : error ? (
        <span className='flex items-center justify-center h-[80%] text-red-500'>Error to load {module}</span>
    ) : (
        children
    )

export default memo(PortalLayout)
