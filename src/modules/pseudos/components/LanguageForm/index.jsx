import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, SliderInput } from '@components'

import { saveLanguage } from '@modules/pseudos/api'

import { languageSchema } from '@utils/schemas'
import { PROFICIENCY_LEVELS } from '@constants/pseudos'

const LanguageForm = ({ show, setShow, mutate, language, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/language${language?.id ? `/${language?.id}/` : '/'}`,
        saveLanguage,
        { vertical_id: id, name: language?.name || '', level: language?.level || 0 },
        languageSchema,
        async formValues => trigger({ ...formValues, id: language?.id }),
        null,
        () => {
            mutate()
            if (!language?.id) resetForm()
        }
    )
    const flag = values.name.length > 0 && values.level > 0

    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{language?.id ? 'Edit' : 'Create'} Language</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter language name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Proficiency level*</span>
                    <SliderInput name='level' max={5} value={values.level} onChange={handleChange} />
                    <span className='text-gray-800 text-center'>{PROFICIENCY_LEVELS[values.level]}</span>
                    {errors.level && <small className='__error'>{errors.level}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={language?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(LanguageForm)
