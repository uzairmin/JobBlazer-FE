import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Button } from '@components'

import { ActionButtons, OtherSectionActions, OtherSectionForm } from '@modules/pseudos/components'
import { fetchOtherSections } from '@modules/pseudos/api'

import { CreateIcon } from '@icons'

const OtherSections = ({ id }) => {
    const [otherSection, setOtherSection] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/profile/other_section/?id=${id}`, fetchOtherSections)

    const handleClick = values => {
        setOtherSection(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />
    return (
        <div className='mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Button label='Add Other Section' fit icon={CreateIcon} onClick={() => handleClick(null)} />
            </div>
            <div className='grid space-y-2'>
                {data?.length > 0 && !error ? (
                    data?.map((row, idx) => (
                        <div className='bg-white rounded-md p-2 md:p-3 border border-cyan-600 relative' key={idx}>
                            <h2 className='text-lg'>{row?.name ?? 'No Name'}</h2>
                            <OtherSectionActions id={row?.id} mutate={mutate} edit={() => handleClick(row)} />
                            <div className='ml-2 mt-1 text-gray-600 break-words'>{row?.value ?? 'Not detail'}</div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No other sections found yet!</span>
                )}
            </div>
            <ActionButtons mutate={mutate} classes='mt-4' />
            {show && (
                <OtherSectionForm show={show} setShow={setShow} mutate={mutate} otherSection={otherSection} id={id} />
            )}
        </div>
    )
}

export default memo(OtherSections)
