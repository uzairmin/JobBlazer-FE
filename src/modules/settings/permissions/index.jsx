import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { PermissionActions, PermissionForm } from '@modules/settings/components'
import { fetchPermissions } from '@modules/settings/api'

import { can } from '@utils/helpers'
import { PERMISSIONS_INITIAL_VALUES } from '@constants/settings'

import { CreateIcon } from '@icons'

const Permissions = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), PERMISSIONS_INITIAL_VALUES)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/auth/permission/?search=${vals.query}&page=${vals.page}`,
        fetchPermissions
    )
    const handleClick = (row, module) => dispatch({ show: !vals.show, permission: row, permissionModule: module })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center pt-3 pb-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                    {can('create_permission') && (
                        <Button label='Create Permission' fit icon={CreateIcon} onClick={() => handleClick()} />
                    )}
                </div>
            </div>
            <div className='grid gap-1'>
                {data?.permissions?.length > 0 && !error ? (
                    data?.permissions?.map((module, idx) => (
                        <div className='bg-white border-b-[1px] border-zinc-400 py-3 relative' key={idx}>
                            <span className='text-[#048C8C] text-lg font-bold uppercase'>{module?.module}</span>
                            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2'>
                                {module?.permissions?.length > 0 && !error ? (
                                    module?.permissions?.map((row, id) => (
                                        <div
                                            className='bg-white border border-[#048C8C] rounded-md p-4 relative'
                                            key={id}
                                        >
                                            <h2 className='text-base'>{row?.name ?? 'Not Specified'}</h2>
                                            {can('edit_permission') && can('delete_permission') && (
                                                <PermissionActions
                                                    id={row?.id}
                                                    mutate={mutate}
                                                    edit={() => handleClick(row, module)}
                                                />
                                            )}
                                            <div className='flex text-sm justify-between gap-2 text-gray-600 italic'>
                                                <span>{row?.codename}</span>
                                                <span>level : {row?.level}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <span className='m-auto p-5 text-gray-500'>No permissions found yet!</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No module found yet!</span>
                )}
            </div>
            {data?.pages > 1 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages} setPage={page => dispatch({ page })} page={vals.page} />
                </div>
            )}
            {can(['create_permission', 'edit_permission']) && vals.show && (
                <PermissionForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    permission={vals?.permission}
                    modules={data?.modules}
                    permissionModule={vals?.permissionModule}
                />
            )}
        </div>
    )
}

export default memo(Permissions)
