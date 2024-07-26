import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, CustomSelector } from '@components'

import { saveAccount } from '@modules/scrapper/api'

import { accountSchema } from '@utils/schemas'
import { parseSelectedVal } from '@utils/helpers'
import { ACCOUNT_SOURCES } from '@constants/scrapper'

const AccountForm = ({ show, setShow, mutate, account }) => {
    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/accounts${account?.id ? `/${account?.id}/` : '/'}`,
        saveAccount,
        {
            id: account?.id,
            email: account?.email,
            password: account?.password,
            source: account?.source || null,
        },
        accountSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => {
            mutate()
            if (!account?.id) resetForm()
        }
    )
    return (
        <Drawer show={show} setShow={setShow} w='400px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{account?.id ? 'Edit' : 'Create'} Account</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Email or Username*</span>
                    <Input
                        type='text'
                        value={values.email}
                        onChange={e => setFieldValue('email', e.target.value)}
                        ph='Enter Email Email or Username'
                    />
                    {errors.email && <small className='ml-1 text-xs text-red-600'>{errors.email}</small>}
                    <span className='text-xs font-semibold mb-1'>Password</span>
                    <Input
                        type='password'
                        value={values.password}
                        onChange={e => setFieldValue('password', e.target.value)}
                        ph='Enter Password'
                    />
                    {errors.password && <small className='ml-1 text-xs text-red-600'>{errors.password}</small>}
                    <span className='text-xs font-semibold'>Source*</span>
                    <CustomSelector
                        options={ACCOUNT_SOURCES}
                        handleChange={({ value }) => setFieldValue('source', value)}
                        selectorValue={parseSelectedVal(values.source, ACCOUNT_SOURCES)}
                        placeholder='Select Source'
                    />
                    {errors.source && <small className='ml-1 text-xs text-red-600'>{errors.source}</small>}
                    <div className='pt-4 space-y-2'>
                        <Button label={account?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(AccountForm)
