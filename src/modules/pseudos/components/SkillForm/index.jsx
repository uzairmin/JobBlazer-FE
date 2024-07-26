import { memo, useState } from 'react'
import useSWR from 'swr'
import { Tooltip } from 'react-tooltip'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, SliderInput } from '@components'

import { GenericSkillForm } from '@modules/pseudos/components'
import { saveSkill, fetchGenericSkills } from '@modules/pseudos/api'

import { skillSchema } from '@utils/schemas'
import { parseSelectedGenericSkill, parseGenericSkills, can } from '@utils/helpers'

const SkillForm = ({ show, setShow, mutate, skill, id }) => {
    const [skillCreate, setSkillCreate] = useState(false)
    const { data, error, isLoading, mutate: refetchSkills } = useSWR(`/api/profile/generic_skill/`, fetchGenericSkills)

    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/profile/skill${skill?.id ? `/${skill?.id}/` : '/'}`,
        saveSkill,
        { vertical_id: id, generic_skill_id: skill?.generic_skill?.id || 0, level: skill?.level || 0 },
        skillSchema,
        async formValues => trigger({ ...formValues, id: skill?.id }),
        null,
        () => {
            mutate()
            if (!skill?.id) resetForm()
        }
    )
    const flag = values.vertical_id > 0 && values.generic_skill_id > 0 && values.level > 0
    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{skill?.id ? 'Edit' : 'Create'} Skill</p>
                    <hr className='mb-2' />
                    {isLoading ? (
                        <small className='ml-1 p-3 text-xs text-gray-400'>Generic Skills Loading...</small>
                    ) : error ? (
                        <div>Failed to load generic skill</div>
                    ) : (
                        <>
                            <span className='text-xs font-semibold flex justify-between items-center'>
                                Skill*
                                {can('create_generic_skill') && (
                                    <Button
                                        label='+'
                                        fit
                                        classes='!px-1.5 !py-0.5 add-skill'
                                        onClick={() => setSkillCreate(true)}
                                    />
                                )}
                                <Tooltip anchorSelect='.add-skill' content='Add skill' />
                            </span>
                            <CustomSelector
                                options={parseGenericSkills(data?.skills)}
                                handleChange={({ value }) => setFieldValue('generic_skill_id', value)}
                                selectorValue={parseSelectedGenericSkill(values.generic_skill_id, data?.skills)}
                                placeholder='Select Generic Skill'
                            />
                            {errors.generic_skill_id && <small className='__error'>{errors.generic_skill_id}</small>}
                        </>
                    )}
                    <span className='text-xs font-semibold'>Level out of 5*</span>
                    <SliderInput name='level' max={5} value={values.level} onChange={handleChange} />
                    {errors.level && <small className='__error'>{errors.level}</small>}
                    {errors.vertical_id && <small className='__error'>{errors.vertical_id}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={skill?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
            {skillCreate && (
                <GenericSkillForm show={skillCreate} setShow={setSkillCreate} mutate={refetchSkills} close />
            )}
        </Drawer>
    )
}

export default memo(SkillForm)
