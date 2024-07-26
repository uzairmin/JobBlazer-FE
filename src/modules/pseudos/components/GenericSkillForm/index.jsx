import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, CustomSelector } from '@components'

import { saveGenericSkill } from '@modules/pseudos/api'

import { genericSkillSchema } from '@utils/schemas'
import { parseSelectedGenericSkillType } from '@utils/helpers'
import { GENERIC_SKILL_TYPES_OPTIONS, GENERIC_SKILL_TYPES } from '@constants/pseudos'

const GenericSkillForm = ({ show, setShow, mutate, skill = null, close = false }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/profile/generic_skill${skill?.id ? `/${skill?.id}/` : '/'}`,
        saveGenericSkill,
        { name: skill?.name || '', type: skill?.type || '' },
        genericSkillSchema,
        async formValues => trigger({ ...formValues, id: skill?.id }),
        null,
        () => {
            mutate()
            if (!skill?.id) resetForm()
            if (close) setShow(false)
        }
    )
    const flag = values.name.length > 0 && values.type.length > 0 && values.type in GENERIC_SKILL_TYPES

    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{skill?.id ? 'Edit' : 'Create'} Generic Skill</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter skill name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Skill Type*</span>
                    <CustomSelector
                        options={GENERIC_SKILL_TYPES_OPTIONS}
                        handleChange={({ value }) => setFieldValue('type', value)}
                        selectorValue={parseSelectedGenericSkillType(values.type)}
                    />
                    {errors.type && <small className='__error'>{errors.type}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={skill?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(GenericSkillForm)
