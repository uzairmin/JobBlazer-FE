import { useState, memo } from 'react'
import useSWR from 'swr'

import CustomSelector from '@components/CustomSelector'
import { Button, Drawer } from '@components'

import { isSuper, parseComapnies } from '@utils/helpers'
import { fetchCompanies } from '@/modules/userManagement/api'
import { integrationNames } from '@/utils/constants/settings'

const FilterForm = ({ show, setShow, filters, setfilters }) => {
    const [values, setValues] = useState(filters)
    const { data, isLoading, error: companyError } = useSWR('/api/auth/company/', isSuper() && fetchCompanies)

    const handleChange = (type, obj) => setValues(preFilters => ({ ...preFilters, [type]: obj }))

    const handleSubmit = () => {
        setfilters(values)
        setShow(!show)
    }

    const renderCompanies = isSuper() ? (
        isLoading ? (
            <div>Loading companies....</div>
        ) : companyError ? (
            <div className='text-red-500 text-xs'>Failed to fetch companies</div>
        ) : (
            <CustomSelector
                options={parseComapnies(data?.companies)}
                handleChange={obj => handleChange('companies', obj)}
                selectorValue={values?.companies}
                isMulti
                placeholder='Company'
            />
        )
    ) : null

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <div className='grid grid-flow-row gap-2'>
                <p className='font-medium text-xl'>Filters</p>
                <hr className='mb-2' />
                {isSuper() && (
                    <>
                        <span className='text-xs font-semibold'>Select Company*</span>
                        {renderCompanies}
                    </>
                )}
                <span className='text-xs font-semibold'>Select Integration*</span>
                <CustomSelector
                    options={integrationNames}
                    handleChange={obj => handleChange('integrations', obj)}
                    selectorValue={values.integrations}
                    isMulti
                    placeholder='Integration'
                />
                <div className='pt-4 space-y-2'>
                    <Button label='Search' fill onClick={handleSubmit} />
                    <Button label='Cancel' onClick={() => setShow(false)} />
                </div>
            </div>
        </Drawer>
    )
}

export default memo(FilterForm)
