import { memo } from 'react'

import { Textarea } from '@components'

const BasicInfoTextareas = ({ values, errors, handleChange = null }) => (
    <>
        <div className='grid md:grid-cols-2 md:gap-5 pt-3'>
            <div>
                <span className='text-xs font-semibold'>Address</span>
                <Textarea
                    rows={2}
                    name='address'
                    value={values.address}
                    onChange={handleChange}
                    ph='Enter vertical address'
                />
                {errors.address && <small className='__error'>{errors.address}</small>}
            </div>
            <div>
                <span className='text-xs font-semibold'>Description</span>
                <Textarea
                    rows={2}
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    ph='Enter vertical description'
                />
                {errors.description && <small className='__error'>{errors.description}</small>}
            </div>
        </div>
        <div>
            <span className='text-xs font-semibold'>Summary</span>
            <Textarea
                rows={5}
                name='summary'
                value={values.summary}
                onChange={handleChange}
                ph='Enter vertical summary'
            />
            {errors.summary && <small className='__error'>{errors.summary}</small>}
        </div>
    </>
)

export default memo(BasicInfoTextareas)
