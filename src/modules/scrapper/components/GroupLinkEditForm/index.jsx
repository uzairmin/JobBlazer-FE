import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Textarea } from '@components'

import { updateGroupLink } from '@modules/scrapper/api'

import { parseJobSource, parseJobType } from '@utils/helpers'
import { JOB_SOURCE_OPTIONS, JOB_TYPES_OPTIONS } from '@constants/scrapper'

import { AllowLeadIcon, DenyLeadIcon } from '@icons'

const GroupLinkEditForm = ({ link = null, switchForm, mutate = null }) => {
    const { values, handleSubmit, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/group_scheduler_link/${link?.id}/`,
        updateGroupLink,
        {
            id: link?.id,
            job_source: link?.job_source,
            job_type: link?.job_type,
            link: link?.link,
        },
        null,
        async formValues => trigger({ ...formValues }),
        null,
        () => {
            switchForm(false)
            if (mutate) mutate()
        }
    )

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-2 items-end'>
            <div className='flex flex-col col-span-1'>
                <small>Job Source*</small>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS}
                    selectorValue={parseJobSource(values?.job_source)}
                    handleChange={({ value }) => setFieldValue('job_source', value)}
                    placeholder='Select job source'
                />
            </div>
            <div className='flex flex-col col-span-1'>
                <small>Job Type*</small>
                <CustomSelector
                    options={JOB_TYPES_OPTIONS}
                    selectorValue={parseJobType(values?.job_type)}
                    handleChange={({ value }) => setFieldValue('job_type', value)}
                    placeholder='Select job type'
                />
            </div>
            <div className='flex flex-col col-span-2'>
                <Textarea
                    rows={2}
                    ph='Enter URL'
                    value={values.link}
                    required
                    onChange={e => setFieldValue('link', e.target.value)}
                />
            </div>
            <div className='flex items-end gap-2 float-right-end col-span-1 w-fit pt-1'>
                <Button icon={AllowLeadIcon} label='Update' classes='!py-1 !gap-1' fit type='submit' fill />
                <Button
                    icon={DenyLeadIcon}
                    label='Cancel'
                    classes='!py-1 !gap-1'
                    fit
                    onClick={() => switchForm(false)}
                />
            </div>
        </form>
    )
}

export default memo(GroupLinkEditForm)
