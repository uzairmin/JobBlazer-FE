import { memo } from 'react'

import { useMutate } from '@/hooks'
import { Modal, Input, TextEditor } from '@components'

import { saveJob } from '@modules/jobsUploader/api'
import { CreateFormButtons } from '@modules/jobsUploader/components'
import { JobSourcesDropdown, JobTypesDropdown, TechStacksDropdown } from '@modules/jobsFilter/components'

import { manualJobSchema } from '@utils/schemas'
import { CREATE_JOB_FORM_INITIAL_VALUES } from '@constants/jobUploader'
import { EDIT_JOB_INPUTS } from '@constants/jobPortal'

const CreateJobForm = ({ show, setShow, mutate }) => {
    const { values, errors, handleChange, handleSubmit, trigger, wait, setFieldValue } = useMutate(
        'api/job_portal/manual_jobs/',
        saveJob,
        { ...CREATE_JOB_FORM_INITIAL_VALUES },
        manualJobSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate() && setShow(!show)
    )
    return (
        <Modal
            classes='!w-4/5'
            show={show}
            setShow={() => setShow(!show)}
            content={
                <div className='w-full'>
                    <p className='font-medium text-xl'>Create Job</p>
                    <hr className='my-2' />
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col md:flex-row gap-5 items-start'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-1/2'>
                                {EDIT_JOB_INPUTS.map(row => (
                                    <div key={row.name}>
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
                                <JobSourcesDropdown
                                    value={values.job_source}
                                    error={errors.job_source}
                                    set={setFieldValue}
                                    onChange={handleChange}
                                />
                                <JobTypesDropdown value={values.job_type} error={errors.job_type} set={setFieldValue} />
                                <TechStacksDropdown
                                    value={values.tech_keywords}
                                    error={errors.tech_keywords}
                                    set={setFieldValue}
                                />
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
                            </div>
                            <div className='md:w-1/2 w-full'>
                                <span className='font-semibold text-[#048c8c]'>Job Description*</span>
                                <TextEditor
                                    init='Enter your Job description'
                                    value={values.job_description_tags}
                                    onChange={text => setFieldValue('job_description_tags', text)}
                                />
                                {errors.job_description_tags && (
                                    <small className='__error'>{errors.job_description_tags}</small>
                                )}
                            </div>
                        </div>
                        <CreateFormButtons wait={wait} set={() => setShow(!show)} />
                    </form>
                </div>
            }
        />
    )
}

export default memo(CreateJobForm)
