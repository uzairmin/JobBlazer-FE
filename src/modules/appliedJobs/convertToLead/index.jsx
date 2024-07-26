import { memo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useMutate } from '@/hooks'

import { Button, Textarea, Input } from '@components'

import { convertToLead } from '@modules/appliedJobs/api'
import { CandidateSelect, StatusAndPhase } from '@modules/appliedJobs/components'

import { convertToLeadSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'

import { BackToIcon } from '@icons'

const ConvertToLead = () => {
    const { id } = useParams()
    const redirect = useNavigate()

    const { values, errors, handleSubmit, trigger, setFieldValue, handleChange } = useMutate(
        `api/lead_managament/leads/`,
        convertToLead,
        { status: '', phase: '', notes: '', effect_date: today, due_date: today, job: id, candidate: '' },
        convertToLeadSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => redirect('/user-applied-jobs')
    )

    const flag = values.status && values.phase && values.candidate
    return (
        <div className='max-w-full hide_scrollbar p-4 mt-4'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='grid grid-cols-2 gap-2'>
                        <StatusAndPhase errors={errors} values={values} setFieldValue={setFieldValue} />
                        <div>
                            <span className='text-sm font-semibold'>Effective Date*</span>
                            <Input type='date' onChange={handleChange} name='effect_date' value={values.effect_date} />
                            {errors.effect_date && <small className='__error'>{errors.effect_date}</small>}
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Due Date*</span>
                            <Input type='date' onChange={handleChange} name='due_date' value={values.due_date} />
                            {errors.due_date && <small className='__error'>{errors.due_date}</small>}
                        </div>
                    </div>
                    <div>
                        <span className='text-sm font-semibold'>Notes*</span>
                        <Textarea rows={5} onChange={handleChange} name='notes' value={values.notes} />
                        {errors.notes && <small className='__error'>{errors.notes}</small>}
                    </div>
                </div>
                <CandidateSelect selected={values.candidate} handleSelect={setFieldValue} />
                <div className='py-5 flex space-x-3 float-right'>
                    {flag && <Button label='Save' type='submit' fit fill classes='!px-12' />}
                    <Button
                        label='Back to Applied Jobs'
                        icon={BackToIcon}
                        fit
                        onClick={() => redirect('/user-applied-jobs')}
                        classes='!pr-6 pl-3'
                    />
                </div>
            </form>
        </div>
    )
}

export default memo(ConvertToLead)
