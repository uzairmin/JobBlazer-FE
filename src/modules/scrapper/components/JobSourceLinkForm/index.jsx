import { memo, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Textarea } from '@components'

import { saveJobSourceLink } from '@modules/scrapper/api'
import { fetchJobSources } from '@modules/settings/api'

import { parseJobType, parseJobSources, parseSelectedJobSource } from '@utils/helpers'
import { jobSourceLinkSchema } from '@utils/schemas'
import { JOB_TYPES_OPTIONS } from '@constants/scrapper'

import { ValidateFalseIcon } from '@icons'

const JobSourceLinkForm = ({ show, setShow, mutate, link }) => {
    const [fields, setFields] = useState(link?.queries ?? [{ link: '', job_type: '' }])
    const submitButtonShow =
        fields.length > 0 && fields.every(field => field.link.length > 0 && field.job_type.length > 0)

    const handleFieldChange = (index, value, select = false) => {
        const newFields = [...fields]
        newFields[index][select ? 'job_type' : 'link'] = value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, { link: '', job_type: '' }])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { data, error, isLoading } = useSWR('api/job_scraper/job_source/', fetchJobSources)

    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/job_source_link${link?.id ? `/${link?.id}/` : '/'}`,
        saveJobSourceLink,
        { id: link?.id, job_source: link?.job_source || '' },
        jobSourceLinkSchema,
        async formValues => trigger({ ...formValues, id: link?.id, queries: fields }),
        null,
        () => {
            mutate()
            if (!link?.id) {
                resetForm()
                setFields([])
            }
            setShow(false)
        }
    )
    return (
        <Drawer
            show={show}
            setShow={setShow}
            w='600px'
            dir='bottom'
            header={`${link?.id ? 'Edit' : 'Create'} Job Source Link / URL`}
        >
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    {isLoading ? (
                        <div className='text-sm text-gray-600'>Loading....</div>
                    ) : error ? (
                        <div className='text-xs text-red-600'>{error}</div>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Job Source*</span>
                            <CustomSelector
                                options={parseJobSources(data?.sources)}
                                selectorValue={parseSelectedJobSource(values?.job_source, data?.sources)}
                                handleChange={({ value }) => setFieldValue('job_source', value)}
                                placeholder='Select Job Source'
                            />
                            {errors.job_source && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>
                            )}
                        </>
                    )}
                    <div className='flex items-center justify-between'>
                        <p>Links</p>
                        {fields.length < 30 && (
                            <>
                                <Button onClick={addField} icon='+' classes='!px-0.5 !py-0 add-field !w-fit' />
                                <Tooltip anchorSelect='.add-field' content='Add Link' />
                            </>
                        )}
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className='flex items-center gap-1 text-sm py-1'>
                            <Textarea
                                rows={1}
                                ph={`Enter URL ${index + 1}`}
                                value={field.link}
                                required
                                classes='mr-1'
                                onChange={e => handleFieldChange(index, e.target.value)}
                            />
                            <CustomSelector
                                options={JOB_TYPES_OPTIONS}
                                selectorValue={parseJobType(field.job_type)}
                                handleChange={({ value }) => handleFieldChange(index, value, true)}
                                placeholder='Select job type'
                                required
                            />
                            <Button
                                classes={`border-0 !text-lg !w-6 !h-6 remove-${index}-field`}
                                icon={ValidateFalseIcon}
                                onClick={() => removeField(index)}
                            />
                            <Tooltip anchorSelect={`.remove-${index}-field`} content={`Remove Link - ${index + 1}`} />
                        </div>
                    ))}
                    <div className='pt-1 flex items-center justify-end gap-2'>
                        {submitButtonShow && (
                            <Button label={link?.id ? 'Update' : 'Submit'} fit type='submit' fill classes='!px-6' />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} fit classes='!px-6' />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(JobSourceLinkForm)
