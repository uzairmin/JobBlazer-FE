import { memo } from 'react'
import { toast } from 'react-hot-toast'

import { Button, Checkbox, Drawer, Input } from '@components'
import { saveCompany } from '@modules/userManagement/api'

import { useMutate } from '@/hooks'
import { companySchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

const JobSourceBlockingForm = ({ show, setShow, mutate, company }) => {
    const { values, errors, handleSubmit, handleChange, resetForm, trigger } = useMutate(
        `/api/auth/company${company?.id ? `/${company?.id}/` : '/'}`,
        saveCompany,
        { name: company?.name || '', status: company?.status },
        companySchema,
        async formValues => {
            trigger({ ...formValues, id: company?.id })
            if (!company?.id) resetForm()
        },
        error => toast.error(getMsg(error)),
        () => company?.id && mutate('/api/auth/company/')
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{company?.id ? 'Edit' : 'Create'} Company</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <div className='pt-3 flex flex-col'>
                        <Checkbox name='status' label='Enabled' onChange={handleChange} checked={values.status} />
                        {errors.status && <small className='ml-1 text-xs text-red-600'>{errors.status}</small>}
                    </div>
                    <div className='pt-4 space-y-2'>
                        <Button label={company?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(JobSourceBlockingForm)
