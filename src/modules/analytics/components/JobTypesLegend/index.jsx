import { memo } from 'react'

import { isset } from '@utils/helpers'
import { JOB_TYPES, JOB_TYPE_COLORS2 } from '@constants/analytics'

const JobTypesLegend = ({ dynamicTypes = {} }) => (
    <div className='w-full flex justify-end gap-6 px-4 flex-wrap'>
        {isset(dynamicTypes)
            ? dynamicTypes?.map(type => (
                  <div
                      className='flex gap-2 items-center'
                      style={{ color: JOB_TYPE_COLORS2[type?.key || 'total'] }}
                      key={type?.key}
                  >
                      <span
                          className='px-4 py-1.5'
                          style={{ backgroundColor: JOB_TYPE_COLORS2[type?.key || 'total'] }}
                      />
                      <span>{type?.name}</span>
                  </div>
              ))
            : Object.keys(JOB_TYPES)
                  .reverse()
                  .map((row, index) => (
                      <div key={index} className='flex gap-2 items-center'>
                          <span style={{ backgroundColor: JOB_TYPE_COLORS2[row] }} className='px-4 py-1.5' />
                          <span>{JOB_TYPES[row]}</span>
                      </div>
                  ))}
    </div>
)

export default memo(JobTypesLegend)
