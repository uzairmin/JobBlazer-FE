import { memo } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector } from '@components'

import { saveCompanyStatus, fetchStatusList } from '@modules/leadManagement/api'

import { companyStatusSchema } from '@utils/schemas'
import { parseStatuses } from '@utils/helpers'

const CompanyStatusForm = ({ show, setShow, mutate }) => {
    const { data, error, isLoading } = useSWR('/api/lead_managament/status_list/', fetchStatusList)
    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        '/api/lead_managament/company_statuses/',
        saveCompanyStatus,
        { status_list: [] },
        companyStatusSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate() && resetForm()
    )

    return (
        <Drawer show={show} setShow={setShow} w='500px' dir='bottom'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Add Status</p>
                    <hr className='mb-2' />
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : error ? (
                        <span>Error to load statuses</span>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Status*</span>
                            <CustomSelector
                                options={parseStatuses(data)}
                                handleChange={obj => setFieldValue('status_list', obj)}
                                selectorValue={values.status_list}
                                isMulti
                                placeholder='Select Status'
                            />
                            {errors.status_list && <small className='__error'>{errors.status_list}</small>}
                        </>
                    )}
                    <div className='pt-4 space-y-2'>
                        {values.status_list.length > 0 && <Button label='Add' type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CompanyStatusForm)
