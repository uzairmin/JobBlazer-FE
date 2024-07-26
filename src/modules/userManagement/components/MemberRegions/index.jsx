import { memo } from 'react'

import { Badge } from '@components'

const MemberRegions = ({ regions = null }) => (
    <span className='flex items-center flex-wrap'>
        {regions?.length > 0
            ? regions?.map(region => (
                  <Badge
                      key={region?.value}
                      label={region?.label}
                      type='success'
                      classes='!py-0.5 !px-1.5 mx-1 my-2 text-xs border border-green-500'
                  />
              ))
            : '-'}
    </span>
)

export default memo(MemberRegions)
