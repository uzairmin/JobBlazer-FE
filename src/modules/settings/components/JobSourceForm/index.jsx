import { memo } from 'react'

import { useMutate } from '@/hooks'

import { useDynamicJobSourcesStore } from '@/stores'

import { Button, Drawer, Input } from '@components'

import { saveJobSource } from '@modules/settings/api'

import { jobSourceSchema } from '@utils/schemas'

const JobSourceForm = ({ refetch = null }) => {
    const [source, show, setShow] = useDynamicJobSourcesStore(state => [state?.source, state?.show, state?.setShow])

    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/job_scraper/job_source${source?.id ? `/${source?.id}/` : '/'}`,
        saveJobSource,
        { name: source?.name || '', key: source?.key || '' },
        jobSourceSchema,
        async formValues => trigger({ ...formValues, id: source?.id }),
        null,
        () => {
            if (refetch) refetch()
            if (!source?.id) resetForm()
        }
    )

    return (
        <Drawer show={show} setShow={setShow} w='350px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{source?.id ? 'Edit' : 'Create'} Job Source</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter job source name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Key*</span>
                    <Input name='key' value={values.key} onChange={handleChange} ph='Enter job source key' />
                    {errors.key && <small className='__error'>{errors.key}</small>}
                    <div className='pt-4 space-y-2'>
                        {values.name.length > 0 && (
                            <Button label={source?.id ? 'Update' : 'Submit'} type='submit' fill />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(JobSourceForm)
