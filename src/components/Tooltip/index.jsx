import { memo, useMemo } from 'react'

const Tooltip = ({ text, down = false, children, disable = false }) => {
    const memoizedTooltip = useMemo(
        () => (
            <span
                className={`absolute ${
                    down ? 'top-full translate-y-1.5' : 'bottom-full -translate-y-1.5'
                } left-1/2 transform -translate-x-1/4 scale-0 transition-all duration-75 rounded-sm bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-10`}
            >
                {text}
            </span>
        ),
        [text]
    )

    return (
        <div className='group relative flex'>
            {children}
            {!disable && memoizedTooltip}
        </div>
    )
}

export default memo(Tooltip)
