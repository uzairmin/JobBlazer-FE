import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input } from '@components'

import { savePseudo } from '@modules/pseudos/api'

import { pseudoSchema } from '@utils/schemas'

const PseudoForm = ({ show, setShow, mutate, pseudo }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/pseudo${pseudo?.id ? `/${pseudo?.id}/` : '/'}`,
        savePseudo,
        { id: pseudo?.id, name: pseudo?.name || '' },
        pseudoSchema,
        async formValues => trigger({ ...formValues, id: pseudo?.id }),
        null,
        () => {
            mutate()
            if (!pseudo?.id) resetForm()
        }
    )
    const flag = values.name.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='400px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{pseudo?.id ? 'Edit' : 'Create'} Pseudo</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter pseudo name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={pseudo?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PseudoForm)
