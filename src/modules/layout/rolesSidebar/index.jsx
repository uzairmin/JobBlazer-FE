import { memo } from 'react'
import useSWRMutation from 'swr/mutation'
import { useNavigate } from 'react-router-dom'

import { Tooltip, Loading } from '@components'

import { switchRole } from '@modules/layout/api'

import { userRoles, activeRole } from '@utils/helpers'

const RolesSidebar = ({ set = null }) => {
    const redirect = useNavigate()

    const { isMutating, trigger } = useSWRMutation('api/auth/roles/', switchRole, {
        shouldRetryOnError: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onSuccess: () => {
            set(false)
            redirect('/dashboard')
        },
    })

    if (isMutating) return <Loading />
    return (
        userRoles()?.length > 0 && (
            <aside
                className='sm:flex hidden w-fit
             sm:flex-col border-2 py-6 text-[#048C8C] bg-[#EDFFFB] h-screen hide_scrollbar px-1.5'
            >
                <div className='flex flex-col gap-3.5 justify-center items-center'>
                    {userRoles()?.map(({ name, id }) => (
                        <Tooltip text={name} down key={id}>
                            <div
                                className={`${
                                    activeRole()?.id === id ? 'bg-[#1c5655] pointer-events-none' : 'bg-[#4ab9a7]'
                                } text-white p-2 uppercase font-semibold rounded-lg cursor-pointer hover:bg-[#048C8C] active:bg-[#1c5655] min-w-[2.5rem] text-center`}
                                onClick={() => {
                                    if (activeRole()?.id !== id) {
                                        set(true)
                                        trigger({ role_id: id })
                                    }
                                }}
                            >
                                {name.length < 2 ? name : name.slice(0, 2)}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </aside>
        )
    )
}
export default memo(RolesSidebar)
