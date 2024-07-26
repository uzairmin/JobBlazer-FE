import { memo, useMemo, useState } from 'react'

import { useMutate } from '@/hooks'
import { Button, Drawer, CustomSelector } from '@components'

import { assignVertical } from '@modules/userManagement/api'
import { UserRolesDropdown, SelectedVerticals } from '@modules/userManagement/components'

import { parseVerticals } from '@utils/helpers'

const PseudosMemberForm = ({ show, setShow, mutate, user, vert, teamId, role = null }) => {
    const [verticals, setVerticals] = useState(
        role ? parseVerticals(user?.roles?.find(r => r?.value === role?.id)?.verticals, false, true) : []
    )

    const memoizedOptions = useMemo(() => {
        if (vert?.length < 0) return []
        const userRegions = user?.regions?.map(region => region.value)
        return parseVerticals(
            vert?.filter(v => v?.regions.some(region => userRegions.includes(region.value))),
            false,
            true
        )
    }, [vert])

    const { values, handleSubmit, trigger, setFieldValue } = useMutate(
        'api/profile/user_vertical_assignment/',
        assignVertical,
        { user_id: user?.id, team_id: teamId, role_id: role?.id || null },
        null,
        async vals =>
            trigger({
                ...vals,
                verticals: verticals.map(obj => obj.value),
                role_id: role?.id ?? vals?.role_id?.value,
            }),
        null,
        () => mutate()
    )

    return (
        <Drawer show={show} setShow={setShow} w='400px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium flex flex-col'>
                        <span className='text-xl'>Vertical Assignment</span>
                        <span className='text-sm tracking-widest'>{user?.username}</span>
                    </p>
                    <hr className='mb-2' />
                    {role ? (
                        <span className='text-xl font-semibold italic'>{role?.name}</span>
                    ) : (
                        <UserRolesDropdown
                            set={setFieldValue}
                            value={values.role_id}
                            options={{ userId: user?.id, teamId }}
                        />
                    )}
                    <span className='text-xs font-semibold'>Verticals</span>
                    <CustomSelector
                        options={memoizedOptions}
                        handleChange={obj => setVerticals(obj)}
                        selectorValue={verticals}
                        isMulti
                        placeholder='Select verticals'
                    />
                    <div className='pt-4 space-y-2'>
                        {values.role_id && <Button label='Assign' type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                    <SelectedVerticals verticals={verticals} set={setVerticals} />
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PseudosMemberForm)
