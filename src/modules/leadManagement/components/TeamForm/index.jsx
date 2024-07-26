import { memo, useState } from 'react'
import { useMutate } from '@/hooks'

import CustomSelector from '@components/CustomSelector'
import { Button, Drawer, Badge, Input } from '@components'

import { saveTeam } from '@/modules/leadManagement/api'
import { parseExposedCandidates, parseTeamCandidates } from '@utils/helpers'

const TeamForm = ({ show, setShow, team, mutate, candidates }) => {
    const [tags, setTags] = useState(team?.team_candidates ? parseTeamCandidates(team?.team_candidates) : [])
    const { values, handleChange, resetForm, trigger, handleSubmit } = useMutate(
        `api/candidate_management/candidate_teams${team?.id ? `/${team?.id}/` : '/'}`,
        saveTeam,
        { name: team?.name || '' },
        null,
        async formValues =>
            trigger({
                ...formValues,
                id: team?.id,
                exposed_candidates: tags.map(item => item.value),
            }),
        null,
        () => {
            mutate()
            if (!team?.id) resetForm()
            setShow({ show: false })
        }
    )
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    return (
        <Drawer show={show} setShow={setShow} w='420px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{team?.id ? 'Edit' : 'Create'} Team</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter Team name' />
                    <span className='text-xs font-semibold'>Candidates</span>
                    <CustomSelector
                        options={parseExposedCandidates(candidates)}
                        handleChange={obj => setTags(obj)}
                        selectorValue={tags}
                        isMulti
                        placeholder='Select Candidates'
                    />
                    <div className='flex flex-wrap gap-3 items-center mt-2'>
                        {tags?.length > 0 &&
                            tags?.map(tag => (
                                <Badge
                                    label={
                                        <span className='inline-block items-center'>
                                            <span>{tag.label}</span>
                                            <button
                                                type='button'
                                                onClick={() => handleTagRemove(tag)}
                                                className='ml-2 italic focus:outline-none hover:text-red-700'
                                            >
                                                X
                                            </button>
                                        </span>
                                    }
                                    type='success'
                                    classes='border border-green-300'
                                    key={tag.value}
                                />
                            ))}
                    </div>
                    <div className='pt-4 space-y-2'>
                        <Button label={team?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow({ show: false })} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(TeamForm)
