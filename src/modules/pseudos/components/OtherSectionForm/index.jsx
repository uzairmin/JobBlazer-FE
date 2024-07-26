import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea } from '@components'

import { saveOtherSection } from '@modules/pseudos/api'

import { otherSectionSchema } from '@utils/schemas'

const OtherSectionForm = ({ show, setShow, mutate, otherSection, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/other_section${otherSection?.id ? `/${otherSection?.id}/` : '/'}`,
        saveOtherSection,
        {
            vertical_id: id,
            name: otherSection?.name || '',
            value: otherSection?.value || '',
        },
        otherSectionSchema,
        async formValues => trigger({ ...formValues, id: otherSection?.id }),
        null,
        () => {
            mutate()
            if (!otherSection?.id) resetForm()
        }
    )
    const flag = values.name.length > 0 && values.value.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='500px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{otherSection?.id ? 'Edit' : 'Create'} Other Section</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter Section name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Section Value*</span>
                    <Textarea
                        name='value'
                        value={values.value}
                        onChange={handleChange}
                        ph='Enter Section value'
                        rows={15}
                    />
                    {errors.value && <small className='__error'>{errors.value}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={otherSection?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(OtherSectionForm)
