import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { useMutate, useDelete } from '@/hooks'
import { Button, Drawer, Input, CustomDilog } from '@components'
import CustomSelector from '@components/CustomSelector'
import { RolesDropdown } from '@modules/userManagement/components'
import { saveTeam, fetchRoleWiseUsers, fetchDropdownUsers } from '@modules/userManagement/api'

import { teamSchema } from '@utils/schemas'
import { getMsg, parseMembers } from '@utils/helpers'
import RoleUsersDropdown from '../ReportingToDropdown'
import { TrashIcon } from '@icons'
import { can } from '@/utils/helpers'

const MemberForm = ({ show, setShow, mutate, team }) => {
    const [role, setRole] = useState(team?.reporting_to?.roles)
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/team${team?.id ? `/${team?.id}/` : '/'}`,
        saveTeam,
        {
            id: team?.id,
            name: team?.name,
            reporting_to: team?.reporting_to?.id,
            members: team?.members?.map(m => ({ value: m.id, label: m.username })),
        },
        teamSchema,
        async formValues => trigger({ ...formValues, id: team?.id }),
        error => toast.error(getMsg(error)),
        () => {
            mutate()
            if (!team?.id) resetForm()
        }
    )
    const { data, isLoading: uLoading } = useSWR(`/api/auth/role_users/${role}/`, role ? fetchRoleWiseUsers : null)
    const { data: fetched, isLoading } = useSWR('/api/auth/user/?type=dropdown', fetchDropdownUsers)

    const { wait, confirm } = useDelete(`/api/auth/team/${team?.id}/`)

    const deleteRole = async () => {
        const result = await confirm()
        if (result && wait === false) {
            setShow(false)
            mutate('/api/auth/team/')
        }
    }

    const { CustomModal, openModal } = CustomDilog(
        'Confirm delete?',
        `Are you sure want to delete the team: ${team?.name}`,
        deleteRole
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{team?.id ? 'Edit' : 'Create'} Team</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter team name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <RolesDropdown value={role} onChange={val => setRole(val.value)} />
                    <RoleUsersDropdown
                        value={values.reporting_to}
                        error={errors.reporting_to}
                        setFieldValue={setFieldValue}
                        options={data?.users}
                        isLoading={uLoading}
                    />
                    {isLoading ? (
                        <div>Loading users...</div>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Members*</span>
                            <CustomSelector
                                name='members'
                                options={parseMembers(fetched?.users, values.reporting_to)}
                                handleChange={obj => setFieldValue('members', obj)}
                                selectorValue={values.members}
                                isMulti
                                placeholder='Select members'
                            />
                            {errors.members && <small className='ml-1 text-xs text-red-600'>{errors.members}</small>}
                        </>
                    )}
                    <div className='pt-4 space-y-2'>
                        <Button label={team?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(MemberForm)
