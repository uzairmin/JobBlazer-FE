import { useState, memo } from 'react'

import CustomSelector from '@components/CustomSelector'
import { Button, Drawer } from '@components'

import { logTypes, requestTypes } from '@/utils/constants/logger'

const FilterForm = ({ show, setShow, filters, setfilters }) => {
    const [values, setValues] = useState(filters)
    const handleChange = (type, obj) => setValues(preFilters => ({ ...preFilters, [type]: obj }))

    const handleSubmit = () => {
        setfilters(values)
        setShow(!show)
    }

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit} className='text-[#328d8c]'>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Filters</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Select Logs Type*</span>
                    <CustomSelector
                        options={logTypes}
                        handleChange={obj => handleChange('logTypes', obj)}
                        selectorValue={values.logTypes}
                        isMulti
                        required
                        placeholder='Log Type'
                    />
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Select Logs Type*</span>
                    <CustomSelector
                        options={requestTypes}
                        handleChange={obj => handleChange('requestTypes', obj)}
                        selectorValue={values.requestTypes}
                        isMulti
                        required
                        placeholder='Request Type'
                    />
                    <div className='pt-2 space-y-2'>
                        <Button label='Search' fill onClick={handleSubmit} />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(FilterForm)
