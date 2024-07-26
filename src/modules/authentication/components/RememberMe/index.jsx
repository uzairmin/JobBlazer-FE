import { memo } from 'react'

import { Switch } from '@components'

const RememberMe = memo(() => (
    <div className='flex items-start'>
        <Switch name='remember' label='Remember Me' />
    </div>
))

export default RememberMe
