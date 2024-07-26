import { memo, useState } from 'react'
import { useFormik } from 'formik'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import { Input, Button } from '@components'

import { filtersSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'

import { ResetIcon, FilterIcon } from '@icons'

const Filters = ({ filters, setFilters }) => {
    const [show, setShow] = useState(false)

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: { from_date: filters.from_date, to_date: filters.to_date },
        validationSchema: filtersSchema,
        onSubmit: async formValues => {
            setFilters(formValues)
            setShow(false)
        },
    })

    const toggleFilters = () => setShow(true)
    const resetFilters = () => {
        setFilters({ from_date: '', to_date: '' })
        setShow(false)
    }

    return (
        <div>
            <div className='flex space-x-3 justify-end mt-4'>
                <Button label='Filter' fit icon={FilterIcon} onClick={toggleFilters} />
                <Button fit icon={ResetIcon} onClick={resetFilters} />
            </div>
            <SlidingPane isOpen={show} from='right' width='250px' onRequestClose={() => setShow(!show)} hideHeader>
                <div className='text-[#048C8C] p-3 h-full'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-flow-row gap-2'>
                            <p className='font-medium text-xl'>Filters</p>
                            <span className='text-sm'>From</span>
                            <Input
                                name='from_date'
                                type='date'
                                value={values.from_date}
                                onChange={handleChange}
                                max={today}
                            />
                            <span className='text-sm'>To</span>
                            <Input
                                name='to_date'
                                type='date'
                                value={values.to_date || today}
                                onChange={handleChange}
                                max={today}
                            />
                            {errors.from_date && (
                                <small className='ml-2 text-sm text-red-400'>{errors.from_date}</small>
                            )}
                            {errors.to_date && <small className='ml-2 text-sm text-red-400'>{errors.to_date}</small>}
                            <Button label='Apply' type='submit' />
                        </div>
                    </form>
                </div>
            </SlidingPane>
        </div>
    )
}

export default memo(Filters)
