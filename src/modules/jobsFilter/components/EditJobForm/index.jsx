import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Modal, Input, TextEditor, Checkbox } from '@components'

import { updateJob } from '@modules/jobsUploader/api'
import {
    JobSourcesDropdown,
    JobTypesDropdown,
    TechStacksDropdown,
    EditFormButtons,
} from '@modules/jobsFilter/components'

import { manualJobSchema } from '@utils/schemas'
import { can, formatDate5, formatTime } from '@utils/helpers'
import { EDIT_JOB_INPUTS } from '@constants/jobPortal'

const EditJobForm = ({ job, set, mutate = null }) => {
    const { values, errors, handleChange, handleSubmit, trigger, wait, setFieldValue } = useMutate(
        `api/job_portal/job_modification/${job?.data?.id}/`,
        updateJob,
        {
            job_title: job?.data?.job_title,
            company_name: job?.data?.company_name,
            job_source: job?.data?.job_source,
            job_type: job?.data?.job_type,
            address: job?.data?.address,
            job_posted_date: formatDate5(job?.data?.job_posted_date),
            time: formatTime(job?.data?.job_posted_date),
            job_source_url: job?.data?.job_source_url,
            job_description_tags: job?.data?.job_description_tags,
            tech_keywords: job?.data?.tech_keywords,
            salary_max: job?.data?.salary_max,
            salary_min: job?.data?.salary_min,
            salary_format: job?.data?.salary_format,
            job_role: job?.data?.job_role || '',
            expired: job?.data?.expired_at,
        },
        manualJobSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => {
            mutate()
            set({ show: false })
        }
    )
    return (
        <Modal
            classes='!w-4/5'
            show={job.show}
            setShow={show => set({ show })}
            content={
                <div className='w-full'>
                    <p className='font-medium text-xl'>Edit Job</p>
                    <hr className='my-2' />
                    <form onSubmit={handleSubmit} className='text-[#048c8c]'>
                        <div className='flex flex-col md:flex-row gap-5 items-start'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-1/2'>
                                {EDIT_JOB_INPUTS.map(row => (
                                    <div key={row.name} className='flex flex-col'>
                                        <span className='text-xs font-semibold text-[#048c8c]'>
                                            {row.label}
                                            {row.required ? '*' : ''}
                                        </span>
                                        <Input
                                            name={row.name}
                                            onChange={handleChange}
                                            value={values[row.name]}
                                            type={row.type}
                                            ph={row.ph}
                                        />
                                        {errors[row.name] && <small className='__error'>{errors[row.name]}</small>}
                                    </div>
                                ))}
                                <div className='flex flex-col'>
                                    <span className='text-xs font-semibold text-[#048c8c]'>Job Source URL*</span>
                                    <Input
                                        name='job_source_url'
                                        onChange={handleChange}
                                        value={values.job_source_url}
                                        type='url'
                                        ph='Enter Job Source Link / URL'
                                    />
                                    {errors.job_source_url && (
                                        <small className='__error'>{errors.job_source_url}</small>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <JobSourcesDropdown
                                        value={values.job_source}
                                        error={errors.job_source}
                                        set={setFieldValue}
                                        onChange={handleChange}
                                    />
                                    <JobTypesDropdown
                                        value={values.job_type}
                                        error={errors.job_type}
                                        set={setFieldValue}
                                    />
                                    <TechStacksDropdown
                                        value={values.tech_keywords}
                                        error={errors.tech_keywords}
                                        set={setFieldValue}
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
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <span className='font-semibold text-[#048c8c]'>Job Description*</span>
                                <TextEditor
                                    init={job?.data?.job_description_tags}
                                    value={values.job_description_tags}
                                    onChange={text => setFieldValue('job_description_tags', text)}
                                />
                                {errors.job_description_tags && (
                                    <small className='__error'>{errors.job_description_tags}</small>
                                )}
                            </div>
                        </div>

                        <EditFormButtons wait={wait} set={set} />
                    </form>
                </div>
            }
        />
    )
}

export default memo(EditJobForm)
