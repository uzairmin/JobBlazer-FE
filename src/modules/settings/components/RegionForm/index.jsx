import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input } from '@components'

import { saveRegion } from '@modules/settings/api'

import { regionSchema } from '@utils/schemas'

const RegionForm = ({ show, setShow, mutate, region = null, close = false }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/candidate_management/regions${region?.id ? `/${region?.id}/` : '/'}`,
        saveRegion,
        { name: region?.region || '' },
        regionSchema,
        async formValues => trigger({ ...formValues, id: region?.id }),
        null,
        () => {
            mutate()
            if (!region?.id) resetForm()
            if (close) setShow(false)
        }
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{region?.id ? 'Edit' : 'Create'} Region</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter region name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <div className='pt-4 space-y-2'>
                        {values.name.length > 0 && (
                            <Button label={region?.id ? 'Update' : 'Submit'} type='submit' fill />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(RegionForm)
