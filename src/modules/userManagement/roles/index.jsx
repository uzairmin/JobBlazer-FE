import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Button, Tooltip } from '@components'

import { RoleForm, PermissionList } from '@modules/userManagement/components'
import { fetchRoles } from '@modules/userManagement/api'

import { can, isSuper } from '@utils/helpers'
import { roleHeads } from '@constants/userManagement'

import { CreateIcon, ActionsIcons, PermissionIcon } from '@icons'

const Roles = () => {
    const [query, setQuery] = useState('')
    const [role, setRole] = useState()
    const [show, setShow] = useState(false)
    const [showList, setShowList] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/auth/role/?search=${query}`, fetchRoles)

    const handleClick = row => {
        setRole(row)
        setShow(!show)
    }

    const handleShow = row => {
        setRole(row)
        setShowList(!showList)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex flex-col space-y-4 py-6 md:flex-row md:items-center md:space-x-4 md:space-y-0'>
                <Searchbox query={query} setQuery={setQuery} />
                {can('create_role') && !isSuper() && (
                    <Button label='Create Role' fit icon={CreateIcon} onClick={() => handleClick({ name: '' })} />
                )}
            </div>
            <div className='__table-r hide_scrollbar'>
                <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {roleHeads.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.roles?.length > 0 && !error ? (
                            data?.roles?.map((row, idx) => (
                                <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{row?.name}</td>
                                    <td className='px-3 py-4 cursor-pointer'>
                                        <span className='flex items-center gap-2' onClick={() => handleShow(row)}>
                                            <Tooltip text='Permissions go here'>{PermissionIcon}</Tooltip>
                                        </span>
                                    </td>
                                    <td className='px-3 py-6 md:float-right' onClick={() => handleClick(row)}>
                                        {can('edit_role') && !isSuper() && ActionsIcons}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={6} msg='No roles found yet!' />
                        )}
                    </tbody>
                </table>
            </div>

            {show && can('edit_role') && <RoleForm show={show} setShow={setShow} mutate={mutate} role={role} />}
            {showList && <PermissionList show={showList} setShow={setShowList} list={role?.permissions} />}
        </div>
    )
}

export default memo(Roles)
