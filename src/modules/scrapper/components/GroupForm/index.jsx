import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Input } from '@components'

import { CronjobTypes } from '@modules/scrapper/components'
import { saveGroupSetting } from '@modules/scrapper/api'

import { parseIntervalType, getSelectedDays } from '@utils/helpers'
import { groupSchema } from '@utils/schemas'
import { INTERVAL_TYPE_OPTIONS, WEEK_DAYS_OPTIONS } from '@constants/scrapper'
import { Enable, Disable } from '@icons'

const GroupForm = ({ show, setShow, mutate, setting }) => {
    const [scrapperType, setScrapperType] = useState({ time: setting?.time_based, interval: setting?.interval_based })
    const [enable, setEnable] = useState(setting?.disabled)

    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/group_scheduler${setting?.id ? `/${setting?.id}/` : '/'}`,
        saveGroupSetting,
        {
            id: setting?.id,
            type: setting ? (setting.scheduler_settings?.time_based ? 'time' : 'interval') : '',
            name: setting?.name || '',
            interval: setting?.scheduler_settings?.interval || 1,
            interval_type: setting?.scheduler_settings?.interval_type || '',
            time: setting?.scheduler_settings?.time || '',
            week_days: getSelectedDays(setting?.scheduler_settings?.week_days),
            disabled: setting?.disabled,
        },
        groupSchema,
        async formValues =>
            trigger({
                ...formValues,
                id: setting?.id,
                time_based: scrapperType.time,
                interval_based: scrapperType.interval,
                week_days: formValues.week_days.map(({ value }) => value).join(','),
                disabled: enable,
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
                    <p className='font-medium text-xl'>{setting?.id ? 'Edit' : 'Create'} Group Setting</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Group Name*</span>
                    <Input
                        type='text'
                        value={values.name}
                        onChange={e => setFieldValue('name', e.target.value)}
                        placeholder='Enter group name'
                    />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold mb-1'>Type</span>
                    <CronjobTypes types={scrapperType} set={setScrapperType} onChange={handleChange} />
                    <span className='text-xs font-semibold mb-1'>Active</span>
                    {console.log('enableee', enable)}
                    <div className='-mt-2' onClick={() => setEnable(!enable)}>
                        {' '}
                        {enable ? Enable : Disable}
                    </div>

                    {errors.type && <small className='ml-1 text-xs text-red-600'>{errors.type}</small>}
                    {scrapperType.time && (
                        <>
                            <span className='text-xs font-semibold'>Time*</span>
                            <Input type='time' name='time' value={values.time} onChange={handleChange} />
                            {errors.time && <small className='ml-1 text-xs text-red-600'>{errors.time}</small>}
                            <span className='text-xs font-semibold'>Days*</span>
                            <CustomSelector
                                name='week_days'
                                options={WEEK_DAYS_OPTIONS}
                                handleChange={obj => setFieldValue('week_days', obj)}
                                selectorValue={values.week_days}
                                isMulti
                                placeholder='Select week days'
                            />
                            {errors.weekDays && <small className='ml-1 text-xs text-red-600'>{errors.weekDays}</small>}
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
                        <Button label={setting?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(GroupForm)
