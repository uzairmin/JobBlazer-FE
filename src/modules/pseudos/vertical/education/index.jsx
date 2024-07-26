import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, EducationActions, EducationForm } from '@modules/pseudos/components'
import { fetchEducations } from '@modules/pseudos/api'

import { formatDate2 } from '@utils/helpers'

import { CreateIcon } from '@icons'

const Education = ({ id }) => {
    const [education, setEducation] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/education/?id=${id}`, fetchEducations)

    const handleClick = values => {
        setEducation(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    const flag = data?.length > 0 && !error

    return (
        <div className='mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Education History' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid gap-2 md:grid-cols-2'>
                {flag ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-2 md:p-4 border relative' key={idx}>
                            <h2 className='text-lg italic'>{row?.institute ?? 'Not Specified'}</h2>
                            <EducationActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='flex flex-col mt-2'>
                                <div className='ml-2'>{row?.degree ?? 'Not Specified'}</div>
                                <div className='ml-2 text-sm'>
                                    From {formatDate2(row?.start_date) ?? 'N/A'} To{' '}
                                    {formatDate2(row?.end_date) ?? 'N/A'}
                                </div>
                                <div className='ml-2 font-semibold text-gray-600'>{row?.grade ?? 'N/A'}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No education history found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4' />
            {show && <EducationForm show={show} setShow={setShow} mutate={mutate} education={education} id={id} />}
        </div>
    )
}

export default memo(Education)
