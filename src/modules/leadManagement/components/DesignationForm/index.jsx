import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Modal, Input, Textarea } from '@components'

import { saveDesignation } from '@modules/leadManagement/api'

import { designationSchema } from '@utils/schemas'

const DesignationForm = ({ show, setShow, mutate, designation = null, close = false }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/candidate_management/designation${designation?.id ? `/${designation?.id}/` : '/'}`,
        saveDesignation,
        { title: designation?.title || '', description: designation?.description || '' },
        designationSchema,
        async formValues => trigger({ ...formValues, id: designation?.id }),
        null,
        () => {
            mutate()
            if (!designation?.id) resetForm()
            if (close) setShow(false)
        }
    )

    return (
        <Modal
            classes='md:!w-[500px]'
            show={show}
            setShow={setShow}
            content={
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className='grid grid-flow-row gap-2'>
                        <p className='font-medium text-xl'>{designation?.id ? 'Edit' : 'Create'} Designation</p>
                        <hr className='mb-2' />
                        <span className='text-xs font-semibold'>Title*</span>
                        <Input name='title' value={values.title} onChange={handleChange} ph='Enter designation title' />
                        {errors.title && <small className='__error'>{errors.title}</small>}
                        <span className='text-xs font-semibold'>Description*</span>
                        <Textarea
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                            ph='Enter designation description'
                        />
                        {errors.description && <small className='__error'>{errors.description}</small>}
                        <div className='pt-4 space-y-2'>
                            {values.title.length > 0 && (
                                <Button label={designation?.id ? 'Update' : 'Submit'} type='submit' fill />
                            )}
                            <Button label='Cancel' onClick={() => setShow(false)} />
                        </div>
                    </div>
                </form>
            }
        />
    )
}

export default memo(DesignationForm)
