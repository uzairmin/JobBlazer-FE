import { memo } from 'react'

import { useMutate } from '@/hooks'

import { useJobPortalV2Store } from '@/stores'

import { Modal, Checkbox, Button } from '@components'

import { updateJob } from '@modules/jobsUploader/api'
import { Description, JobEditInputs, JobSourceURL, TechsDropdown } from '@modules/jobPortal-v2/components'
import { JobSourcesDropdown, JobTypesDropdown } from '@modules/jobsFilter/components'

import { manualJobSchema } from '@utils/schemas'
import { can } from '@utils/helpers'
import { JOB_EDIT_INITIAL_VALUES } from '@/utils/constants/jobPortalV2'

const JobEditForm = () => {
    const [job, show, setShow, mutate] = useJobPortalV2Store(state => [
        state?.job,
        state?.edit,
        state?.setEdit,
        state?.mutator,
    ])

    const { values, errors, handleChange, handleSubmit, trigger, wait, setFieldValue } = useMutate(
        `api/job_portal/job_modification/${job?.id}/`,
        updateJob,
        JOB_EDIT_INITIAL_VALUES(job),
        manualJobSchema,
        async formValues =>
            trigger({ ...formValues, tech_keywords: formValues?.tech_keywords?.map(tech => tech.value)?.join(',') }),
        null,
        () => {
            mutate()
            setShow(false)
        }
    )

    return (
        <Modal
            classes='md:!w-4/5'
            show={show}
            setShow={setShow}
            content={
                <div className='w-full'>
                    <p className='font-medium text-xl'>Edit Job</p>
                    <hr className='my-2' />
                    <form onSubmit={handleSubmit} className='text-[#048c8c]'>
                        <div className='flex flex-col md:flex-row gap-2 md:gap-5 items-start'>
                            <div className='md:grid md:grid-cols-2 space-y-1.5 md:gap-2 md:space-y-0 w-full md:w-1/2'>
                                <JobEditInputs values={values} errors={errors} handleChange={handleChange} />
                                <JobSourcesDropdown
                                    value={values.job_source}
                                    error={errors.job_source}
                                    set={setFieldValue}
                                    onChange={handleChange}
                                />
                                <JobTypesDropdown value={values.job_type} error={errors.job_type} set={setFieldValue} />
                                <TechsDropdown
                                    selected={values.tech_keywords}
                                    error={errors.tech_keywords}
                                    set={setFieldValue}
                                />
                                <JobSourceURL
                                    value={values.job_source_url}
                                    error={errors.job_source_url}
                                    onChange={handleChange}
                                />
                                {can('mark_as_expired') && (
                                    <div className='mt-1.5'>
                                        <Checkbox
                                            label={values.expired ? 'Unmark job as active' : 'Mark job as expired'}
                                            checked={values.expired}
                                            onChange={e => setFieldValue('expired', e.target.checked)}
                                        />
                                    </div>
                                )}
                            </div>
                            <Description
                                value={values?.job_description_tags}
                                error={errors?.job_description_tags}
                                job={job}
                                set={setFieldValue}
                            />
                        </div>
                        <div className='pt-4 flex justify-end gap-2'>
                            <Button label='Cancel' fit onClick={() => setShow(false)} classes='!px-4' />
                            <Button label='Update' fit fill type='submit' disabled={wait} classes='!px-8' />
                        </div>
                    </form>
                </div>
            }
        />
    )
}

export default memo(JobEditForm)
