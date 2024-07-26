import { memo, useState } from 'react'

import { DeleteDialog, Tooltip, Badge } from '@components'

import { can } from '@utils/helpers'
import { GENERIC_SKILL_DELETION } from '@constants/allowDeletion'

import { RemoveExposedToIcon } from '@icons'

const ExposedTo = ({ companies, mutate = null }) => {
    const [show, setShow] = useState(false)
    const [id, setId] = useState(null)

    return (
        <td className='px-3 py-6 flex items-center flex-wrap space-x-1.5 gap-y-1.5'>
            {companies?.length > 0
                ? companies.map(company => (
                      <Badge
                          key={company?.id}
                          label={
                              <span className='flex items-center'>
                                  <span>{company?.name ?? 'N/A'}</span>
                                  {can('remove_exposed_to') && (
                                      <DeleteDialog
                                          show={show}
                                          setShow={setShow}
                                          url={`/api/candidate_management/candidate_exposed/${id}/`}
                                          refetch={mutate}
                                          perm={GENERIC_SKILL_DELETION}
                                      >
                                          <Tooltip text='Remove exposure'>
                                              <button
                                                  type='button'
                                                  onClick={() => {
                                                      setShow(true)
                                                      setId(company?.exposed_candidate_id)
                                                  }}
                                                  className='ml-1 hover:text-red-500'
                                              >
                                                  {RemoveExposedToIcon}
                                              </button>
                                          </Tooltip>
                                      </DeleteDialog>
                                  )}
                              </span>
                          }
                          type='success'
                          classes='text-xs pr-1 border-2 text-cyan-600 border-cyan-200 bg-cyan-100'
                      />
                  ))
                : 'not exposed'}
        </td>
    )
}

export default memo(ExposedTo)
