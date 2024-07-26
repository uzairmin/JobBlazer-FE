import { memo } from 'react'
import { useMutate } from '@/hooks'
import { generateCoverLetter } from '@modules/coverLetter/api'
import { Button, Drawer, Input, Textarea, Loading } from '@components'
import { coverLetterSchema } from '@utils/schemas'

const Form = ({ show, setShow, setInit }) => {
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, wait } = useMutate(
        'api/job_portal/cover_letter/generate/',
        generateCoverLetter,
        { name: '', company: '', experience: '', job_des: '' },
        coverLetterSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error)),
        data => {
            setInit(data.coverletter)
            setShow(false)
            resetForm()
        }
    )
    if (wait) return <Loading />
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Cover Letter Form</p>
                    <hr className='mb-2' />
                    <Input name='name' onChange={handleChange} value={values.name} ph='name' label='name' />{' '}
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <Input name='company' onChange={handleChange} value={values.company} ph='company' label='company' />
                    {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                    <Input
                        name='experience'
                        onChange={handleChange}
                        value={values.experience}
                        ph='experience'
                        label='experience'
                    />
                    {errors.experience && <small className='ml-1 text-xs text-red-600'>{errors.experience}</small>}
                    <Textarea
                        name='job_des'
                        onChange={handleChange}
                        value={values.job_des}
                        ph='job description'
                        label='Job Description'
                    />
                    {errors.job_des && <small className='ml-1 text-xs text-red-600'>{errors.job_des}</small>}
                    <div className='pt-4 space-y-2'>
                        <Button label='Generate' fill type='submit' />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(Form)
