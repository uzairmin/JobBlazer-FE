import { memo } from 'react'

import { Badge, Tooltip } from '@components'

import { EditIcon } from '@icons'

const MemberVerticals = ({ member = null, edit = null }) => (
    <span className='flex items-center flex-wrap gap-2'>
        {member?.roles?.length > 0
            ? member?.roles?.map(
                  item =>
                      item?.value &&
                      item?.verticals?.length > 0 && (
                          <div
                              className='border border-[#53a1a1] p-1.5 rounded-md flex items-center shadow-md'
                              key={item?.value}
                          >
                              <span className='capitalize font-semibold'>{item?.label ?? 'No Role'}:</span>
                              <span className='flex items-center flex-wrap'>
                                  {item?.verticals?.length > 0
                                      ? item?.verticals?.map(vert => (
                                            <div className='mx-1 my-2' key={vert?.id}>
                                                <Badge label={`${vert?.pseudo} | ${vert?.name}`} />
                                            </div>
                                        ))
                                      : '-'}
                              </span>
                              <Tooltip text='Update verticals'>
                                  <span
                                      className='p-1 bg-[#4ab9a7] rounded text-white'
                                      onClick={() => edit(member, { id: item?.value, name: item?.label })}
                                  >
                                      {EditIcon}
                                  </span>
                              </Tooltip>
                          </div>
                      )
              )
            : '-'}
    </span>
)

export default memo(MemberVerticals)
