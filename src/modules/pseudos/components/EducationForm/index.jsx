import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input } from '@components'

import { saveEducation } from '@modules/pseudos/api'

import { educationSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'

const EducationForm = ({ show, setShow, mutate, education, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/education${education?.id ? `/${education?.id}/` : '/'}`,
        saveEducation,
        {
            vertical_id: id,
            institute: education?.institute || '',
            degree: education?.degree || '',
            grade: education?.grade || '',
            start_date: education?.start_date || today,
            end_date: education?.end_date || today,
        },
        educationSchema,
        async formValues => trigger({ ...formValues, id: education?.id }),
        null,
        () => {
            mutate()
            if (!education?.id) resetForm()
        }
    )
    const flag = values.institute.length > 0 && values.degree.length > 0 && values.grade.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{education?.id ? 'Edit' : 'Create'} Education</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Institute*</span>
                    <Input name='institute' value={values.institute} onChange={handleChange} ph='Enter Institute' />
                    {errors.institute && <small className='__error'>{errors.institute}</small>}
                    <span className='text-xs font-semibold'>Degree*</span>
                    <Input name='degree' value={values.degree} onChange={handleChange} ph='Enter degree title' />
                    {errors.degree && <small className='__error'>{errors.degree}</small>}
                    <span className='text-xs font-semibold'>Start Date*</span>
                    <Input
                        name='start_date'
                        type='date'
                        value={values.start_date}
                        onChange={handleChange}
                        max={today}
                    />
                    {errors.start_date && <small className='__error'>{errors.start_date}</small>}
                    <span className='text-xs font-semibold'>End Date*</span>
                    <Input name='end_date' type='date' value={values.end_date} onChange={handleChange} max={today} />
                    {errors.end_date && <small className='__error'>{errors.end_date}</small>}
                    <span className='text-xs font-semibold'>Grade or Marks*</span>
                    <Input
                        name='grade'
                        value={values.grade}
                        onChange={handleChange}
                        ph='3.00 / 4.00 or A+ Grade or 879 / 1100'
                    />
                    {errors.grade && <small className='__error'>{errors.grade}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={education?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(EducationForm)
