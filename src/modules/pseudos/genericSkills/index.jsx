import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { GenericSkillActions, GenericSkillForm } from '@modules/pseudos/components'
import { fetchGenericSkills } from '@modules/pseudos/api'

import { GENERIC_SKILL_TYPES } from '@constants/pseudos'
import { can } from '@utils/helpers'

import { CreateIcon } from '@icons'

const GenericSkills = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [skill, setSkill] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(
        `/api/profile/generic_skill/?search=${query}&page=${page}`,
        fetchGenericSkills
    )

    const handleClick = values => {
        setSkill(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='mb-14 md:px-5 px-3'>
            <div className='flex items-center md:py-6 py-3 justify-between'>
                <div className='flex flex-col flex-wrap md:flex-row gap-2 md:items-center'>
                    <div className='flex gap-2'>
                        <Searchbox query={query} setQuery={setQuery} />
                    </div>
                    {can('create_generic_skill') && (
                        <Button label='Create Generic Skill' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                    )}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                {data?.skills?.length > 0 && !error ? (
                    data?.skills?.map((row, idx) => (
                        <div className='bg-white border border-[#048C8C] rounded-md md:p-4 p-2 relative' key={idx}>
                            <h2 className='md:text-lg'>{row?.name ?? 'Not Specified'}</h2>
                            {can('edit_generic_skill') && can('delete_generic_skill') && (
                                <GenericSkillActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            )}
                            <div className='text-sm mt-2'>{GENERIC_SKILL_TYPES[row?.type] ?? 'N/A'}</div>
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No generic skills found yet!</span>
                )}
            </div>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages ?? Math.ceil(data.total / 25)} setPage={setPage} page={page} />
                </div>
            )}
            {show && <GenericSkillForm show={show} setShow={setShow} mutate={mutate} skill={skill} />}
        </div>
    )
}

export default memo(GenericSkills)
