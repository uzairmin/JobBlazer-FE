import { memo } from 'react'

import { Button } from '@components'

import { ResetIcon, FilterIcon } from '@icons'

const Filters = ({ apply = null, clear = null }) =>
    apply || clear ? (
        <div className='flex space-x-4 h-fit'>
            {apply ? <Button label='Filter' fit icon={FilterIcon} onClick={apply} /> : null}
            {clear ? <Button fit icon={ResetIcon} onClick={clear} /> : null}
        </div>
    ) : null

export default memo(Filters)
