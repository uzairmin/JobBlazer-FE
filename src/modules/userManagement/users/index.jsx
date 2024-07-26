import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Button, Paginated, Badge } from '@components'

import { UserForm, UsersActions } from '@modules/userManagement/components'
import { fetchUsers } from '@modules/userManagement/api'

import { can } from '@utils/helpers'
import { userHeads } from '@constants/userManagement'

import { CreateIcon } from '@icons'

const Users = () => {
    const [query, setQuery] = useState('')
    const [user, setUser] = useState()
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/auth/user/?page=${page}&search=${query}&limit=20`,
        fetchUsers
    )
    const handleClick = values => {
        setUser(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex flex-col md:flex-row items-left space-y-4 md:space-y-0 md:space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} reset={setPage} />
                {can('create_user') && (
                    <Button
                        label='Create User'
                        fit
                        icon={CreateIcon}
                        onClick={() => handleClick({ username: '', email: '', roles: '' })}
                    />
                )}
            </div>
            <div className='__table-r hide_scrollbar'>
                <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {userHeads.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.users?.length > 0 && !error ? (
                            data?.users?.map((row, idx) => (
                                <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{row?.email}</td>
                                    <td className='px-3 py-6'>{row?.username}</td>
                                    <td className='px-3 py-6'>
                                        {row?.roles?.length > 0 ? (
                                            <div className='flex flex-wrap gap-1'>
                                                {row?.roles?.map(r => (
                                                    <Badge label={r?.label} key={r?.value} classes='!text-sm' />
                                                ))}
                                            </div>
                                        ) : (
                                            'not assigned'
                                        )}
                                    </td>
                                    <td className='px-3 py-6 font-bold'>{row?.company ? row?.company?.name : '-'}</td>
                                    <td className='px-3 py-6 md:float-right'>
                                        {can(['edit_user', 'delete_user']) && (
                                            <UsersActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={6} msg='No users found yet!' />
                        )}
                    </tbody>
                </table>
            </div>
            {data?.pages > 1 && (
                <div className='w-full flex justify-center'>
                    <Paginated pages={data?.pages} setPage={setPage} page={page} />
                </div>
            )}
            {can('edit_user') && show && <UserForm show={show} setShow={setShow} mutate={mutate} user={user} />}
        </div>
    )
}

export default memo(Users)
