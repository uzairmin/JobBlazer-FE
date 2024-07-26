import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Input } from '@components'

import { CronjobTypes } from '@modules/scrapper/components'
import { saveCronjobSetting } from '@modules/scrapper/api'

import { parseIntervalType, parseJobSource } from '@utils/helpers'
import { cronjobSettingSchema } from '@utils/schemas'
import { INTERVAL_TYPE_OPTIONS, JOB_SOURCE_OPTIONS } from '@constants/scrapper'

const CronjobSettingForm = ({ show, setShow, mutate, setting }) => {
    const [scrapperType, setScrapperType] = useState({ time: setting?.time_based, interval: setting?.interval_based })

    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/scheduler${setting?.id ? `/${setting?.id}/` : '/'}`,
        saveCronjobSetting,
        {
            id: setting?.id,
            type: setting ? (setting?.time_based ? 'time' : 'interval') : '',
            job_source: setting?.job_source || '',
            interval: setting?.interval || 1,
            interval_type: setting?.interval_type || '',
            time: setting?.time || '',
        },
        cronjobSettingSchema,
        async formValues =>
            trigger({
                ...formValues,
                id: setting?.id,
                time_based: scrapperType.time,
                interval_based: scrapperType.interval,
            }),
        null,
        () => {
            mutate()
            if (!setting?.id) resetForm()
        }
    )

    return (
        <Drawer show={show} setShow={setShow} w='400px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{setting?.id ? 'Edit' : 'Create'} Cronjob Setting</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Job Source*</span>
                    <CustomSelector
                        options={JOB_SOURCE_OPTIONS}
                        selectorValue={parseJobSource(values.job_source)}
                        handleChange={({ value }) => setFieldValue('job_source', value)}
                        placeholder='Select job source'
                    />
                    {errors.job_source && <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>}
                    <span className='text-xs font-semibold mb-1'>Type*</span>
                    <CronjobTypes types={scrapperType} set={setScrapperType} onChange={handleChange} />
                    {errors.type && <small className='ml-1 text-xs text-red-600'>{errors.type}</small>}
                    {scrapperType.time && (
                        <>
                            <span className='text-xs font-semibold'>Time*</span>
                            <Input type='time' name='time' value={values.time} onChange={handleChange} />
                            {errors.time && <small className='ml-1 text-xs text-red-600'>{errors.time}</small>}
                        </>
                    )}
                    {scrapperType.interval && (
                        <>
                            <span className='text-xs font-semibold'>Interval Number*</span>
                            <Input
                                ph='Enter interval number'
                                type='number'
                                name='interval'
                                min={values.interval_type === 'minutes' ? 25 : 1}
                                value={values.interval}
                                onChange={handleChange}
                            />
                            {errors.interval && <small className='ml-1 text-xs text-red-600'>{errors.interval}</small>}
                            <span className='text-xs font-semibold'>Interval Type*</span>
                            <CustomSelector
                                options={INTERVAL_TYPE_OPTIONS}
                                selectorValue={parseIntervalType(values.interval_type)}
                                handleChange={e => setFieldValue('interval_type', e.value)}
                                placeholder='Select interval type'
                            />
                            {errors.interval_type && (
                                <small className='ml-1 text-xs text-red-600'>{errors.interval_type}</small>
                            )}
                        </>
                    )}
                    <div className='pt-4 space-y-2'>
                        {(scrapperType.time || scrapperType.interval) && (
                            <Button label={setting?.id ? 'Update' : 'Submit'} type='submit' fill />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CronjobSettingForm)
