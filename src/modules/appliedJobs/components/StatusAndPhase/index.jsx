import { memo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchStatusPhases } from '@modules/appliedJobs/api'

import { parseSelectedStatus, parseStatuses, parseStatusPhases, parseSelectedStatusPhase } from '@utils/helpers'

const StatusAndPhase = ({ values, errors, setFieldValue }) => {
    const { data, isLoading, error } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases)

    return isLoading ? (
        <span>Loading...</span>
    ) : error ? (
        <span>Error to Load statuses</span>
    ) : (
        <>
            <div>
                <span className='text-sm font-semibold'>Status*</span>
                <CustomSelector
                    options={parseStatuses(data)}
                    handleChange={({ value }) => setFieldValue('status', value)}
                    selectorValue={parseSelectedStatus(values.status, data)}
                    placeholder='Select Status'
                />
                {errors.status && <small className='__error'>{errors.status}</small>}
            </div>
            <div>
                <span className='text-sm font-semibold'>Phase*</span>
                {values.status ? (
                    <CustomSelector
                        options={parseStatusPhases(values.status, data)}
                        handleChange={({ value }) => setFieldValue('phase', value)}
                        selectorValue={parseSelectedStatusPhase(values.phase, values.status, data)}
                        placeholder='Select Phase'
                    />
                ) : (
                    <p className='text-sm mt-2'>Please select status first</p>
                )}
                {errors.phase && <small className='__error'>{errors.phase}</small>}
            </div>
        </>
    )
}

export default memo(StatusAndPhase)
