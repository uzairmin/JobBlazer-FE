import { memo } from 'react'

import { useMutate } from '@/hooks'

import { CustomSelector, Button, Input } from '@components'
import { changeLeadStatus } from '@modules/leadManagement/api'

import { parseStatusPhases, parseSelectedStatusPhase, parseStatuses, parseSelectedStatus } from '@utils/helpers'
import { updatePhaseSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'

const UpdatePhase = ({ lead = null, statuses = null, error = null, loading = true, mutate }) => {
    const { values, errors, handleSubmit, trigger, setFieldValue, handleChange } = useMutate(
        `api/lead_managament/leads/${lead?.id}/`,
        changeLeadStatus,
        {
            status: lead?.company_status?.id || '',
            phase: lead?.phase?.id || '',
            effect_date: lead?.effect_date ?? today,
            due_date: lead?.due_date ?? today,
        },
        updatePhaseSchema,
        async formValues => trigger({ ...formValues, phase: formValues.phase }),
        null,
        () => mutate()
    )
    return lead ? (
        <div className='border p-2 mt-3'>
            <p className='text-lg'>Update Lead</p>
            <hr />
            <form onSubmit={handleSubmit} className='flex flex-col mt-2 p-1 gap-2 text-sm text-cyan-700'>
                {loading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>Error to Load phases & statuses</span>
                ) : (
                    <>
                        <div>
                            <span className='text-sm font-semibold'>Status*</span>
                            <CustomSelector
                                options={parseStatuses(statuses)}
                                handleChange={({ value }) => setFieldValue('status', value)}
                                selectorValue={parseSelectedStatus(values.status, statuses)}
                                placeholder='Select Status'
                            />
                            {errors.status && <small className='__error'>{errors.status}</small>}
                        </div>
                        <div>
                            <span className='text-xs font-semibold'>Phase*</span>
                            <CustomSelector
                                options={parseStatusPhases(values.status, statuses)}
                                handleChange={({ value }) => setFieldValue('phase', value)}
                                selectorValue={parseSelectedStatusPhase(values.phase, values.status, statuses)}
                                placeholder='Select Phase'
                            />
                            {errors.phase && <small className='__error'>{errors.phase}</small>}
                        </div>
                    </>
                )}
                <div>
                    <span className='text-xs font-semibold'>Effective Date*</span>
                    <Input type='date' onChange={handleChange} name='effect_date' value={values.effect_date} />
                    {errors.effect_date && <small className='__error'>{errors.effect_date}</small>}
                </div>
                <div>
                    <span className='text-xs font-semibold'>Due Date*</span>
                    <Input type='date' onChange={handleChange} name='due_date' value={values.due_date} />
                    {errors.due_date && <small className='__error'>{errors.due_date}</small>}
                </div>
                {parseSelectedStatusPhase(values.phase, values.status, statuses) && (
                    <Button label='Update' type='submit' />
                )}
            </form>
        </div>
    ) : null
}

export default memo(UpdatePhase)
