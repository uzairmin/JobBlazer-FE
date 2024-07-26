import { memo, useReducer, useRef } from 'react'
import { Link } from 'react-router-dom'

import { useJobPortalV2Store } from '@/stores'

import { DeleteDialog, Button } from '@components'

import { can } from '@utils/helpers'

import { ActionsIcons } from '@icons'

const JobActions = ({ job = null }) => {
    const dropdownRef = useRef(null)
    const [show, set] = useReducer((state, newState) => ({ ...state, ...newState }), { menu: false, dialog: false })

    const [setJob, mutate] = useJobPortalV2Store(state => [state?.setJob, state?.mutator])

    if (show?.menu)
        window.addEventListener('click', event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) set({ menu: false })
        })

    return can(['edit_job', 'delete_job', 'view_job_history']) && job ? (
        <div className='relative' ref={dropdownRef}>
            <Button
                icon={ActionsIcons}
                fit
                classes={`!border-0 !m-0 !p-0 ${show?.menu ? '!bg-[#edfffb]' : ''}`}
                onClick={() => set({ menu: !show?.menu })}
            />
            {show?.menu && (
                <div className='absolute md:right-0 w-max z-50 bg-white border border-[#55bf84] shadow-md flex flex-col mt-1 pt-2.5 pb-2 gap-y-2 text-sm'>
                    {can('edit_job') && (
                        <button
                            onClick={() => {
                                setJob(job)
                                set({ menu: false })
                            }}
                            className='bg-transparent border-0 hover:bg-[#edfffb] hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            Edit Job
                        </button>
                    )}
                    {can('delete_job') && (
                        <DeleteDialog
                            show={show?.dialog}
                            setShow={val => set({ dialog: val })}
                            url={`api/job_portal/job_modification/${job?.id}/`}
                            refetch={mutate}
                        >
                            <button
                                onClick={() => set({ dialog: true })}
                                className='bg-transparent border-0 hover:bg-[#edfffb] hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                            >
                                Delete Job
                            </button>
                        </DeleteDialog>
                    )}
                    {can('view_job_history') && job?.edited && (
                        <Link
                            to={`/edit-history/${job?.id}`}
                            state={{ module: 'JobDetail', backTo: 'Job Portal 2.0', backToUrl: '/jobs-portal/v2' }}
                            className='bg-transparent border-0 hover:bg-[#edfffb] hover:text-[#048C8C] !px-2 flex items-center justify-between gap-4'
                        >
                            Show History
                        </Link>
                    )}
                </div>
            )}
        </div>
    ) : null
}
export default memo(JobActions)
