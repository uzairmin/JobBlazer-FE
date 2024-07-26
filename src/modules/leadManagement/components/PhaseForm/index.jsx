import { memo } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, Input } from '@components'

import { savePhase, fetchCompanyStatusList } from '@modules/leadManagement/api'

import { phaseSchema } from '@utils/schemas'
import { parseCompanyStatus, parseSelectedCompanyStatus } from '@utils/helpers'

const PhaseForm = ({ phase = null, show, setShow, mutate }) => {
    const { data, error, isLoading } = useSWR('/api/lead_managament/company_status_list/', fetchCompanyStatusList)
    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/lead_managament/phases${phase?.id ? `/${phase?.id}/` : '/'}`,
        savePhase,
        { name: phase?.name || '', company_status_id: phase?.company_status?.id || '' },
        phaseSchema,
        async formValues => trigger({ ...formValues, id: phase?.id }),
        null,
        () => {
            mutate()
            if (!phase?.id) resetForm()
        }
    )

    const flag = values.name.length > 0 && values.company_status_id
    return (
        <Drawer show={show} setShow={setShow} w='500px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{phase?.id ? 'Edit' : 'Create'} Phase</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter phase name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : error ? (
                        <span>Error to load statuses</span>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Status*</span>
                            <CustomSelector
                                options={parseCompanyStatus(data)}
                                handleChange={({ value }) => setFieldValue('company_status_id', value)}
                                selectorValue={parseSelectedCompanyStatus(values.company_status_id, data)}
                                placeholder='Select Status'
                            />
                            {errors.company_status_id && <small className='__error'>{errors.company_status_id}</small>}
                        </>
                    )}
                    <div className='pt-4 space-y-2'>
                        {flag && <Button label={phase?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PhaseForm)
