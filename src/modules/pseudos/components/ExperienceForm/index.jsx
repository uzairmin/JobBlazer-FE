import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea, Checkbox } from '@components'

import { saveExperience } from '@modules/pseudos/api'

import { experienceSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'

const ExperienceForm = ({ show, setShow, mutate, experience, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/profile/experience${experience?.id ? `/${experience?.id}/` : '/'}`,
        saveExperience,
        {
            vertical_id: id,
            company_name: experience?.company_name || '',
            designation: experience?.designation || '',
            description: experience?.description || '',
            start_date: experience?.start_date || today,
            currently: !!experience?.currently,
            end_date: experience?.end_date || today,
        },
        experienceSchema,
        async formValues => trigger({ ...formValues, id: experience?.id }),
        null,
        () => {
            mutate()
            if (!experience?.id) resetForm()
        }
    )
    const flag = values.company_name.length > 0 && values.designation.length > 0
    return (
        <Drawer show={show} setShow={setShow} w='450px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{experience?.id ? 'Edit' : 'Create'} Experience</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Company Name*</span>
                    <Input
                        name='company_name'
                        value={values.company_name}
                        onChange={handleChange}
                        ph='Enter Company name'
                    />
                    {errors.company_name && <small className='__error'>{errors.company_name}</small>}
                    <span className='text-xs font-semibold'>Designation*</span>
                    <Input
                        name='designation'
                        value={values.designation}
                        onChange={handleChange}
                        ph='Enter designation name'
                    />
                    {errors.designation && <small className='__error'>{errors.designation}</small>}
                    <span className='text-xs font-semibold'>Start Date*</span>
                    <Input
                        name='start_date'
                        type='date'
                        value={values.start_date}
                        onChange={handleChange}
                        max={today}
                    />
                    {errors.start_date && <small className='__error'>{errors.start_date}</small>}
                    {!values.currently && (
                        <>
                            <span className='text-xs font-semibold'>End Date*</span>
                            <Input
                                name='end_date'
                                type='date'
                                value={values.end_date}
                                onChange={handleChange}
                                max={today}
                            />
                            {errors.end_date && <small className='__error'>{errors.end_date}</small>}
                        </>
                    )}
                    <span className='my-1'>
                        <Checkbox
                            name='currently'
                            label='Currently Working'
                            checked={values.currently}
                            onChange={e => setFieldValue('currently', e.target.checked)}
                        />
                    </span>
                    <span className='text-xs font-semibold'>Description</span>
                    <Textarea
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        ph='Enter description'
                    />
                    {errors.description && <small className='__error'>{errors.description}</small>}
                    <div className='pt-4 flex gap-2'>
                        {flag && <Button label={experience?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(ExperienceForm)
