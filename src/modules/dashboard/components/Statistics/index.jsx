import { memo } from 'react'

import { StatCard } from '@components'

const Statistics = ({ data, classes }) => (
    <div className={`${classes}`}>
        {data?.length > 0 &&
            data.map(({ name, value }, index) => <StatCard label={name} value={value} key={name} index={index} />)}
    </div>
)

export default memo(Statistics)
