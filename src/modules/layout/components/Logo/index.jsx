import { memo } from 'react'

import { OctagonLogo } from '@svgs'

const Logo = memo(({ toggle = true }) =>
    toggle ? (
        <span className='block'>
            <OctagonLogo />
        </span>
    ) : (
        ''
    )
)

export default Logo
