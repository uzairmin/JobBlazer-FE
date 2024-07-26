import { memo } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import CustomSelector from '@components/CustomSelector'
import { Button, Checkbox, Drawer, Input } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'
import { saveIntegration } from '@modules/settings/api'

import { decodeJwt, getMsg, isSuper, parseComapnies, parseSelectedCompany } from '@utils/helpers'
import { integrationSchema } from '@utils/schemas'
import { integrationNames } from '@constants/settings'

const IntegrationForm = ({ show, setShow, mutate, integration }) => {
    const loggedUser = decodeJwt()
    const { data, isLoading, error: companyError } = useSWR('/api/auth/company/', isSuper() && fetchCompanies)
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/integration${integration?.id ? `/${integration?.id}/` : '/'}`,
        saveIntegration,
        {
            name: integration?.name,
            status: integration?.status,
            api_key: integration?.api_key,
            company: integration?.company?.id || loggedUser?.company,
        },
        integrationSchema,
        async formValues => trigger({ ...formValues, id: integration?.id }),
        error => toast.error(getMsg(error)),
        () => (errors ? mutate('/api/auth/integration/') : resetForm())
    )

    const renderCompanies =
        isSuper() &&
        (isLoading ? (
            <div>Loading companies....</div>
        ) : companyError ? (
            <div className='text-red-500 text-xs'>Failed to fetch companies</div>
        ) : (
            <CustomSelector
                options={parseComapnies(data?.companies)}
                handleChange={({ value }) => setFieldValue('company', value)}
                selectorValue={parseSelectedCompany(values.company, data?.companies)}
                placeholder='Select Company'
            />
        ))

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{integration?.id ? 'Edit' : 'Add'} Integration</p>
                    <hr className='mb-2' />
                    {isSuper() && (
                        <>
                            <span className='text-xs font-semibold'>Select Company*</span>
                            {renderCompanies}
                            {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                        </>
                    )}
                    <span className='text-xs font-semibold'>Select Integration*</span>
                    <CustomSelector
                        options={integrationNames}
                        handleChange={({ value }) => setFieldValue('name', value)}
                        selectorValue={integrationNames.find(val => val.value === values.name)}
                        placeholder='Integration'
                    />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Api Key*</span>
                    <Input name='api_key' value={values.api_key} onChange={handleChange} ph='Api Key' />
                    {errors.api_key && <small className='ml-1 text-xs text-red-600'>{errors.api_key}</small>}
                    <div className='pt-3 flex flex-col'>
                        <Checkbox name='status' label='Enabled' onChange={handleChange} checked={values.status} />
                        {errors.status && <small className='ml-1 text-xs text-red-600'>{errors.status}</small>}
                    </div>
                    <div className='pt-4 space-y-2'>
                        <Button label={integration?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(IntegrationForm)
