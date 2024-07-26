import { memo, useState } from 'react'
import useSWR from 'swr'
import { Tooltip } from 'react-tooltip'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Textarea } from '@components'

import { GroupsDropDown } from '@modules/scrapper/components'

import { saveGroupLink } from '@modules/scrapper/api'
import { fetchJobSources } from '@modules/settings/api'

import { parseJobType, parseJobSources, parseSelectedJobSource } from '@utils/helpers'
import { JOB_TYPES_OPTIONS } from '@constants/scrapper'

import { ValidateFalseIcon } from '@icons'

const GroupLinksCreateForm = ({ show, setShow, mutate, link }) => {
    const [fields, setFields] = useState(link?.queries ?? [{ link: '', job_type: '', job_source: '' }])
    const submitButtonShow =
        fields.length > 0 &&
        fields.every(field => field.link.length > 0 && field.job_type.length > 0 && field?.job_source?.length > 0)

    const handleFieldChange = (index, value, select = false, source = false) => {
        const newFields = [...fields]
        newFields[index][select ? 'job_type' : source ? 'job_source' : 'link'] = value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, { link: '', job_type: '', job_source: '' }])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { data, error, isLoading } = useSWR('api/job_scraper/job_source/', fetchJobSources)

    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/group_scheduler_link/`,
        saveGroupLink,
        { id: link?.id, group_scraper: link?.group_scraper?.id || '', name: link?.group_scraper?.name },
        null,
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
        <Drawer show={show} setShow={setShow} w='700px' dir='bottom' classes='!p-1'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Create Group Link / URL</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Scrapper Group*</span>
                    {'edit_job_source_link' && (
                        <GroupsDropDown
                            value={values.group_scraper}
                            error={errors.group}
                            setFieldValue={setFieldValue}
                        />
                    )}
                    {errors.job_source && <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>}
                    <div className='flex items-center justify-between mb-1'>
                        <p>Links</p>
                        {fields.length < 1000 && (
                            <>
                                <Button onClick={addField} icon='+' classes='!px-0.5 !py-0 add-field !w-fit' />
                                <Tooltip anchorSelect='.add-field' content='Add Link' />
                            </>
                        )}
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className='flex flex-col items-center md:flex-row gap-1 text-sm'>
                            <Textarea
                                rows={1}
                                ph={`Enter URL ${index + 1}`}
                                value={field.link}
                                required
                                onChange={e => handleFieldChange(index, e.target.value)}
                            />
                            <CustomSelector
                                options={JOB_TYPES_OPTIONS}
                                selectorValue={parseJobType(field.job_type)}
                                handleChange={({ value }) => handleFieldChange(index, value, true)}
                                placeholder='Select job type'
                                required
                            />
                            {isLoading ? (
                                <div className='text-sm text-gray-600'>Loading....</div>
                            ) : error ? (
                                <div className='text-xs text-red-600'>{error}</div>
                            ) : (
                                <CustomSelector
                                    options={parseJobSources(data?.sources)}
                                    selectorValue={parseSelectedJobSource(field?.job_source, data?.sources)}
                                    handleChange={({ value }) => handleFieldChange(index, value, false, true)}
                                    placeholder='Select Job Source'
                                />
                            )}
                            <Button
                                classes={`border-0 !text-lg !w-6 !h-6 remove-${index}-field`}
                                icon={ValidateFalseIcon}
                                onClick={() => removeField(index)}
                            />
                            <Tooltip anchorSelect={`.remove-${index}-field`} content={`Remove Link - ${index + 1}`} />
                        </div>
                    ))}
                    <div className='pt-2 flex items-center justify-end gap-2'>
                        {submitButtonShow && <Button label='Save' type='submit' fit classes='!px-6' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} fit classes='!px-6' />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(GroupLinksCreateForm)
