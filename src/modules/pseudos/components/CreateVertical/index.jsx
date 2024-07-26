import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea } from '@components'

import { saveVertical } from '@modules/pseudos/api'

import { createVerticalSchema } from '@utils/schemas'

const CreateVertical = ({ show, setShow, mutate, pseudoId }) => {
    const { values, errors, handleSubmit, trigger, handleChange } = useMutate(
        '/api/profile/vertical/',
        saveVertical,
        { pseudo_id: pseudoId, name: '', description: '', email: '' },
        createVerticalSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => {
            setShow(!show)
            mutate()
        }
    )
    const flag = values.name.length > 0 && values.email.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Create Vertical</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter vertical name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Email*</span>
                    <Input
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        ph='Enter vertical email'
                    />
                    {errors.email && <small className='ml-1 text-xs text-red-600'>{errors.email}</small>}
                    <span className='text-xs font-semibold'>Description</span>
                    <Textarea
                        rows={3}
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        ph='Enter vertical description'
                    />
                    {errors.description && <small className='ml-1 text-xs text-red-600'>{errors.description}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label='Submit' type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CreateVertical)
