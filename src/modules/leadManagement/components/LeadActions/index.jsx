import { memo, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { can } from '@utils/helpers'

import { SeePassIcon, AssignCandidateIcon, ActionsIcons, HistoryIcon, LeadNoteIcon } from '@icons'

const LeadActions = ({ lead, dispatch = null }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => setIsOpen(!isOpen)
    const closeDropdown = () => setIsOpen(false)

    if (isOpen)
        window.addEventListener('click', event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) closeDropdown()
        })

    return can('view_lead_details') || can('assign_candidate') || can('view_lead_history') ? (
        <div className='relative inline-block' ref={dropdownRef}>
            <button onClick={toggleDropdown} className={`${isOpen ? 'animate-bounce' : ''}`}>
                {ActionsIcons}
            </button>
            {isOpen && (
                <div className='absolute right-0 w-max z-10 bg-white border border-gray-300 rounded-md shadow-xl flex flex-col pt-2.5 pb-2 gap-y-2'>
                    {can('view_lead_details') && (
                        <button
                            onClick={() => {
                                dispatch({ draggable: lead?.id, show: true })
                                closeDropdown()
                            }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>View lead details</span>
                            <span>{SeePassIcon}</span>
                        </button>
                    )}
                    {can('assign_candidate') && (
                        <Link
                            to={`/assign-candidate/${lead?.id}`}
                            state={{ candidate: lead?.candidate?.id }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>Assign candidate</span>
                            <span>{AssignCandidateIcon}</span>
                        </Link>
                    )}
                    {can('view_lead_notes') && (
                        <Link
                            to={`/lead-notes/${lead?.id}`}
                            state={{ status: lead?.status?.id, phase: lead?.phase?.id ?? '' }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>See notes</span>
                            <span>{LeadNoteIcon}</span>
                        </Link>
                    )}
                    {can('view_lead_history') && lead?.edited && (
                        <Link
                            to={`/edit-history/${lead?.id}`}
                            state={{ module: 'Lead', backTo: 'Leads', backToUrl: '/leads' }}
                            className='bg-transparent border-0 hover:bg-slate-100 hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            <span className='tracking-wide'>Show edit history</span>
                            <span>{HistoryIcon}</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    ) : null
}
export default memo(LeadActions)
