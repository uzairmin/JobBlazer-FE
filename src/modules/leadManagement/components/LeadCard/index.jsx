import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Badge, Tooltip } from '@components'

import { CurrentPhaseIcon, LeadVerticalIcon, AssignCandidateIcon, LeadCandidateIcon, LeadAppliedByIcon } from '@icons'

const LeadCard = ({ lead, dispatch }) => (
    <div
        className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2'
        onClick={() => dispatch({ show: true, draggable: lead?.id })}
    >
        <p className='text-sm capitalize'>{lead?.applied_job?.title}</p>
        <p className='capitalize italic py-2'>{lead?.applied_job?.company}</p>
        {lead?.applied_job?.vertical_name && lead?.applied_job?.vertical_name?.length > 0 && (
            <p className='flex space-x-1 mb-2'>
                <span>{LeadVerticalIcon}</span>
                <span className='text-xs capitalize'>{lead?.applied_job?.vertical_name}</span>
            </p>
        )}
        <p className='flex'>
            <span>{CurrentPhaseIcon}</span>
            <span className='text-xs'>{lead?.phase_name ?? 'not set'}</span>
        </p>
        <div className='flex items-center justify-end gap-2'>
            <Tooltip text='Assign Candidate'>
                <Link to={`/assign-candidate/${lead?.id}`} state={{ candidate: lead?.candidate?.id }}>
                    {AssignCandidateIcon}
                </Link>
            </Tooltip>
            <Badge label={lead?.applied_job?.tech_stack} classes='text-xs' type='success' />
        </div>
        <div className='border mt-2 bg-slate-200 flex items-center justify-between p-2 text-gray-600 rounded-md border-gray-300'>
            <p className='flex items-center text-sm'>
                <span className='text-xs pr-1 italic'>{LeadAppliedByIcon}</span>
                {lead?.applied_job?.applied_by?.name ?? 'not set'}
            </p>
            {lead?.candidate?.name && (
                <Tooltip text='Candidate'>
                    <p className='flex items-center text-sm'>
                        <span className='text-xs pr-1 italic'>{LeadCandidateIcon}</span>
                        {lead?.candidate?.name ?? 'N/A'}
                    </p>
                </Tooltip>
            )}
        </div>
    </div>
)

export default memo(LeadCard)
